import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;

    const { pathname } = req.nextUrl;

    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (token && pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/'],
};
