import { NextResponse } from "next/server";

import { authError, networkError } from "../../../../shared/lib/apiResponse";
import { clearAuthCookies, getAccessToken, getRefreshToken, setAuthCookies } from "../../../../shared/lib/cookies";
import { fetchBackend } from "../../../../shared/lib/fetchBackend";

type UserResponse = {
	success: boolean;
	data: { id: string; nickname: string; email: string };
};

type RefreshResponse = {
	data: { accessToken: string; expiresIn: number };
};

const fetchMe = (accessToken: string) =>
	fetchBackend<UserResponse>("/api/v1/users/me", {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

export const GET = async () => {
	try {
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return authError("E_AUTH_001", "인증 토큰이 없습니다.");
		}

		let result = await fetchMe(accessToken);

		// 401이면 토큰 갱신 시도
		if (!result.ok && result.status === 401) {
			const refreshToken = await getRefreshToken();

			if (!refreshToken) {
				await clearAuthCookies();
				return authError("E_AUTH_001", "인증 토큰이 없습니다.");
			}

			const refreshResult = await fetchBackend<RefreshResponse>("/api/v1/auth/refresh", {
				method: "POST",
				body: { refreshToken }
			});

			if (!refreshResult.ok) {
				await clearAuthCookies();
				return authError("E_AUTH_003", "유효하지 않은 토큰입니다.");
			}

			const newAccessToken = refreshResult.data.data.accessToken;
			await setAuthCookies(newAccessToken, refreshToken);
			result = await fetchMe(newAccessToken);
		}

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		return NextResponse.json(result.data);
	} catch (error) {
		return networkError(error);
	}
};
