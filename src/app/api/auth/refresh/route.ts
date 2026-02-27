import { NextResponse } from "next/server";

import { authError, networkError } from "../../../../shared/lib/apiResponse";
import { clearAuthCookies, getRefreshToken, setAuthCookies } from "../../../../shared/lib/cookies";
import { fetchBackend } from "../../../../shared/lib/fetchBackend";

type RefreshResponse = {
	data: { accessToken: string; expiresIn: number };
	message: string;
	timestamp: string;
};

export const POST = async () => {
	try {
		const refreshToken = await getRefreshToken();

		if (!refreshToken) {
			return authError("E_AUTH_001", "인증 토큰이 없습니다.");
		}

		const result = await fetchBackend<RefreshResponse>("/api/v1/auth/refresh", {
			method: "POST",
			body: { refreshToken }
		});

		if (!result.ok) {
			await clearAuthCookies();
			return NextResponse.json(result.data, { status: result.status });
		}

		await setAuthCookies(result.data.data.accessToken, refreshToken);

		return NextResponse.json({
			success: true,
			data: {
				accessToken: result.data.data.accessToken,
				expiresIn: result.data.data.expiresIn
			},
			message: result.data.message,
			timestamp: result.data.timestamp
		});
	} catch (error) {
		await clearAuthCookies();
		return networkError(error);
	}
};
