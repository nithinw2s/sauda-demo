// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log('Middleware triggered for path:', request.nextUrl.pathname);
  // Check for authentication (e.g., a token in cookies or session)
  const token = request.cookies.get('auth_token')?.value;

  // Define protected routes
  const protectedPaths = ['/dashboard', '/bike'];

  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Optionally verify token (e.g., with JWT)
    // Example: const decoded = verifyToken(token);
    // if (!decoded) return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Specify which paths the middleware applies to
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};