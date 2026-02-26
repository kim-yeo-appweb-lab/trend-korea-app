import { NextResponse } from "next/server";

import { clearAuthCookies, getRefreshToken, setAuthCookies } from "../../../../shared/lib/cookies";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

export const POST = async () => {
	try {
		const refreshToken = await getRefreshToken();

		if (!refreshToken) {
			return NextResponse.json(
				{
					success: false,
					error: {
						code: "E_AUTH_001",
						message: "인증 토큰이 없습니다.",
						details: {}
					},
					timestamp: new Date().toISOString()
				},
				{ status: 401 }
			);
		}

		const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken })
		});

		const data = await response.json();

		if (!response.ok) {
			await clearAuthCookies();
			return NextResponse.json(data, { status: response.status });
		}

		await setAuthCookies(data.data.accessToken, refreshToken);

		return NextResponse.json({
			success: true,
			data: {
				accessToken: data.data.accessToken,
				expiresIn: data.data.expiresIn
			},
			message: data.message,
			timestamp: data.timestamp
		});
	} catch {
		await clearAuthCookies();
		return NextResponse.json(
			{
				success: false,
				error: {
					code: "E_NETWORK",
					message: "서버에 연결할 수 없습니다.",
					details: {}
				},
				timestamp: new Date().toISOString()
			},
			{ status: 502 }
		);
	}
};
