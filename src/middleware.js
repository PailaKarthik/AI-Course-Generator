import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import { auth } from "./app/auth";
import requestIp from "request-ip";

const rateLimitOptions = {
    max: 20,
    ttl: 60 * 1000,
};

const cache = new LRUCache(rateLimitOptions);

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const ip = requestIp.getClientIp(req)|| req.ip;

    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const rateLimitedRoutes = ["/api", "/login", "/unauthorized", "/roadmap"];
    if (rateLimitedRoutes.some((route) => pathname.startsWith(route))) {
        const token = cache.get(ip) || 0;

        if (token >= rateLimitOptions.max) {
            return NextResponse.json(
                { error: "Too many requests, slow down!" },
                { status: 429 }
            );
        }

        cache.set(ip, token + 1);
    }

    const authtoken = await auth();

    if (!authtoken) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/generate/:path*",
        "/chapter-test/:path*",
        "/roadmap/:path*",
        "/api/user/:path*",
    ],
};
