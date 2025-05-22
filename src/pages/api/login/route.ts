// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // Simulate authentication
  console.log('Simulating authentication...');
  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set('auth_token', 'your-jwt-token', { httpOnly: true });
  console.log('Set auth_token cookie', response.cookies.get('auth_token')?.value);
  return response;
}