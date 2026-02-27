import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/tracking", "/mypage", "/community/write"];
const AUTH_PATHS = ["/login", "/register"];

export const proxy = (request: NextRequest) => {
	const { pathname } = request.nextUrl;
	const hasAccessToken = request.cookies.has("access_token");

	const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
	if (isProtected && !hasAccessToken) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));
	if (isAuthPath && hasAccessToken) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: ["/tracking/:path*", "/mypage/:path*", "/community/write", "/login", "/register"]
};
