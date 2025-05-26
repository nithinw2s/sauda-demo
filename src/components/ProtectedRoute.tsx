// components/ProtectedRoute.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import { Typography, Box } from '@mui/material';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;

    if (!accessToken) {
      setNeedsLogin(true);
      // Delay redirect to show message
      const timer = setTimeout(() => {
        router.push('/auth');
      }, 3000); // 3-second delay
      return () => clearTimeout(timer);
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.ok) {
          setIsLoading(false);
        } else if (refreshToken) {
          const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshRes.ok) {
            const { access } = await refreshRes.json();
            setCookie(null, 'access_token', access, {
              path: '/',
              maxAge: 30 * 60,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            });
            setIsLoading(false);
          } else {
            setNeedsLogin(true);
            const timer = setTimeout(() => {
              router.push('/auth');
            }, 3000); // 3-second delay
            return () => clearTimeout(timer);
          }
        } else {
          setNeedsLogin(true);
          const timer = setTimeout(() => {
            router.push('/auth');
          }, 3000); // 3-second delay
          return () => clearTimeout(timer);
        }
      } catch {
        setNeedsLogin(true);
        const timer = setTimeout(() => {
          router.push('/auth');
        }, 3000); // 3-second delay
        return () => clearTimeout(timer);
      }
    };

    verifyToken();
  }, [router]);

  if (needsLogin) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Typography variant="h5" color="error">
          Please log in to continue. Redirecting to login page in 3 seconds...
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Typography>Loading authentication status...</Typography>
      </Box>
    );
  }

  return <>{children}</>;
}