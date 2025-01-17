import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '~/lib/auth';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.gif')
  ) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/kouki', request.url))
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		},
  );
  
  const protectedPaths = [
    "/kouki",
    "/kouki/follow",
    "/kouki/add",
    "/kouki/settings",
  ];
 
	if (!session && protectedPaths.includes(pathname)) {
		return NextResponse.redirect(new URL("/kouki/auth", request.url));
  }
  if (session && pathname === "/kouki/auth") {
    return NextResponse.redirect(new URL("/kouki", request.url));
  }

	return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source:
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}