import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { makeStore } from "./lib/store";

export function middleware(request: NextRequest) {
    const store = makeStore().getState();
    const auth = store.auth;
    const { pathname } = request.nextUrl;

    // Skip middleware for login and register routes
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        return NextResponse.next();
    }

    const token = request.cookies.get('access_token');

    if (!auth.isAuthenticated || !auth.user || !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

//target all paths
export const config = {
  matcher: ['/', '/((?!_next|api|favicon.ico).*)'],
};
