import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  // Redirect to login if no access token
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  try {
    // Verify access token
    await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next();
  } catch (error) {
    // Access token invalid, try refreshing
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }

    try {
      // Call refresh token endpoint
      const response = await nonzeroRefreshToken(refreshToken);
      if (response.ok) {
        const { access } = await response.json();
        const res = NextResponse.next();
        // Update access token in cookies
        res.cookies.set('access_token', access, {
          path: '/',
          maxAge: 30 * 60, // 30 minutes
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
        return res;
      } else {
        return NextResponse.redirect(new URL('/auth', req.url));
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      return NextResponse.redirect(new URL('/auth', req.url));
    }
  }
}

async function nonzeroRefreshToken(refreshToken: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });
}

export const config = {
  matcher: ['/dashboard', '/electronics', '/furnitures', '/fashions'],
};