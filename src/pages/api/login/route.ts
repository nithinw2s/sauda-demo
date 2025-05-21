// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // Simulate authentication
  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set('auth_token', 'your-jwt-token', { httpOnly: true });
  return response;
}