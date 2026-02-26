import { NextResponse } from "next/server";

import { clearAuthCookies, getAccessToken, getRefreshToken, setAuthCookies } from "../../../../shared/lib/cookies";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

const fetchMe = async (accessToken: string) => {
	return fetch(`${API_BASE_URL}/api/v1/users/me`, {
		headers: { Authorization: `Bearer ${accessToken}` }
	});
};

export const GET = async () => {
	try {
		const accessToken = await getAccessToken();

		if (!accessToken) {
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

		let response = await fetchMe(accessToken);

		// 401이면 토큰 갱신 시도
		if (response.status === 401) {
			const refreshToken = await getRefreshToken();

			if (refreshToken) {
				const refreshResponse = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ refreshToken })
				});

				if (refreshResponse.ok) {
					const refreshData = await refreshResponse.json();
					const newAccessToken = refreshData.data.accessToken;
					await setAuthCookies(newAccessToken, refreshToken);
					response = await fetchMe(newAccessToken);
				} else {
					await clearAuthCookies();
					return NextResponse.json(
						{
							success: false,
							error: {
								code: "E_AUTH_003",
								message: "유효하지 않은 토큰입니다.",
								details: {}
							},
							timestamp: new Date().toISOString()
						},
						{ status: 401 }
					);
				}
			} else {
				await clearAuthCookies();
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
		}

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status });
		}

		return NextResponse.json(data);
	} catch {
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
