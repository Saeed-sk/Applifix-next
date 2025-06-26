// middleware.ts
import {NextResponse, NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const protectedRoutes = ['/dashboard', '/dashboard/chats', '/dashboard/chats/:id'];
    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (request.nextUrl.pathname === '/login' && token) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

// تنظیم مسیرهایی که middleware باید اجرا شود
export const config = {
    matcher: ['/dashboard/:path*'],
};
