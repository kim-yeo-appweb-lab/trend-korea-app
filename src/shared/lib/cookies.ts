import { cookies } from "next/headers";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: IS_PRODUCTION,
	sameSite: "lax" as const
};

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
	const cookieStore = await cookies();

	cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
		...COOKIE_OPTIONS,
		path: "/",
		maxAge: 60 * 60 // 1시간
	});

	cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
		...COOKIE_OPTIONS,
		path: "/api/auth",
		maxAge: 14 * 24 * 60 * 60 // 14일
	});
};

export const clearAuthCookies = async () => {
	const cookieStore = await cookies();

	cookieStore.set(ACCESS_TOKEN_KEY, "", {
		...COOKIE_OPTIONS,
		path: "/",
		maxAge: 0
	});

	cookieStore.set(REFRESH_TOKEN_KEY, "", {
		...COOKIE_OPTIONS,
		path: "/api/auth",
		maxAge: 0
	});
};

export const getAccessToken = async (): Promise<string | undefined> => {
	const cookieStore = await cookies();
	return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
};

export const getRefreshToken = async (): Promise<string | undefined> => {
	const cookieStore = await cookies();
	return cookieStore.get(REFRESH_TOKEN_KEY)?.value;
};
