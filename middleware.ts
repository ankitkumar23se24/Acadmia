import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl

    if (token && (
        url.pathname.startsWith('/signin') ||
        url.pathname.startsWith('/signup') ||
        url.pathname.startsWith('/admin')
    )) {
        if (token.isAdmin && url.pathname.startsWith('/admin')) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!token && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    if (url.pathname.startsWith('/api/admin')) {
        if (token && token.isAdmin) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }  
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/signin',
        '/signup',
        '/admin',
        '/api/admin/:path*',
    ],
}