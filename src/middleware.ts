// middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.has('token');
    const {pathname, origin} = request.nextUrl;

    const protectedRoutes = ['/dashboard'];
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(`${origin}/login`);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
    ],
};
