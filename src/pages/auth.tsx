'use client';
import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Tabs, Tab, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin
      ? `${process.env.NEXT_PUBLIC_API_URL}/token/`
      : `${process.env.NEXT_PUBLIC_API_URL}/register/`;

    const payload = isLogin
      ? { username : email, password }
      : { name : name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setCookie(null, 'access_token', data.access, {
          path: '/',
          maxAge: 30 * 60, // 30 minutes
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        setCookie(null, 'refresh_token', data.refresh, {
          path: '/',
          maxAge: 7 * 24 * 60 * 60, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        router.push('/dashboard');
      } else {
        setError(data.detail || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to server');
    }
  };

  return (
    <Container maxWidth="sm" className="min-h-screen flex items-center justify-center bg-gray-100">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="text-center mb-6 font-bold text-gray-800">
          {isLogin ? 'Sign In' : 'Create Account'}
        </Typography>
        {error && (
          <Typography color="error" className="text-center mb-4">
            {error}
          </Typography>
        )}
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={(e, newValue) => setIsLogin(newValue === 0)}
          centered
          className="mb-6"
        >
          <Tab label="Sign In" className="text-blue-600" />
          <Tab label="Sign Up" className="text-blue-600" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              className="rounded-md"
            />
          )}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            className="rounded-md"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className="rounded-md"
          />
          <Button
            type="submit"
            variant="contained"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </Box>
        <Typography className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </Typography>
      </Paper>
    </Container>
  );
}