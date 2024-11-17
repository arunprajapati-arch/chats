import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/chat/:path*', '/api/auth/signin'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
 
  

  if (
    token &&
    (url.pathname.startsWith('/api/auth/signin'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && url.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }

  return NextResponse.next();
}