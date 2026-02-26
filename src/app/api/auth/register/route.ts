import { NextResponse } from "next/server";

import { setAuthCookies } from "../../../../shared/lib/cookies";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

export const POST = async (request: Request) => {
	try {
		const body = await request.json();

		const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status });
		}

		await setAuthCookies(data.data.tokens.accessToken, data.data.tokens.refreshToken);

		return NextResponse.json(
			{
				success: true,
				data: { user: data.data.user },
				message: data.message,
				timestamp: data.timestamp
			},
			{ status: 201 }
		);
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
