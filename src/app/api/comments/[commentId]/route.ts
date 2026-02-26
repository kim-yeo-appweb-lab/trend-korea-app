import { NextResponse } from "next/server";

import { getAccessToken } from "../../../../shared/lib/cookies";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

type RouteContext = {
	params: Promise<{ commentId: string }>;
};

export const PATCH = async (request: Request, context: RouteContext) => {
	try {
		const { commentId } = await context.params;
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return NextResponse.json(
				{
					success: false,
					error: { code: "E_AUTH_001", message: "로그인이 필요합니다.", details: {} },
					timestamp: new Date().toISOString()
				},
				{ status: 401 }
			);
		}

		const body = await request.json();
		const response = await fetch(`${API_BASE_URL}/api/v1/comments/${commentId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(body)
		});
		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status });
		}

		return NextResponse.json(data);
	} catch {
		return NextResponse.json(
			{
				success: false,
				error: { code: "E_NETWORK", message: "서버에 연결할 수 없습니다.", details: {} },
				timestamp: new Date().toISOString()
			},
			{ status: 502 }
		);
	}
};

export const DELETE = async (_request: Request, context: RouteContext) => {
	try {
		const { commentId } = await context.params;
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return NextResponse.json(
				{
					success: false,
					error: { code: "E_AUTH_001", message: "로그인이 필요합니다.", details: {} },
					timestamp: new Date().toISOString()
				},
				{ status: 401 }
			);
		}

		const response = await fetch(`${API_BASE_URL}/api/v1/comments/${commentId}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		if (response.status === 204) {
			return NextResponse.json({
				success: true,
				data: null,
				message: "댓글 삭제 성공",
				timestamp: new Date().toISOString()
			});
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
				error: { code: "E_NETWORK", message: "서버에 연결할 수 없습니다.", details: {} },
				timestamp: new Date().toISOString()
			},
			{ status: 502 }
		);
	}
};
