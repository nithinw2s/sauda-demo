// middleware.ts (in project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/bike', '/home'];

export function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);
  const token = request.cookies.get('auth_token')?.value || "TOCKEN";
  console.log('Token found:', token ? 'Yes' : 'No');
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    console.log('Redirecting to login from:', request.nextUrl.pathname);
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

// Matcher for Pages Router paths
export const config = {
  matcher: ['/dashboard/:path*', '/bike/:path*', '/home/:path*'],
};