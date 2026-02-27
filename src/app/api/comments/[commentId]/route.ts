import { NextResponse } from "next/server";

import { authError, networkError } from "../../../../shared/lib/apiResponse";
import { getAccessToken } from "../../../../shared/lib/cookies";
import { fetchBackend } from "../../../../shared/lib/fetchBackend";

type RouteContext = {
	params: Promise<{ commentId: string }>;
};

export const PATCH = async (request: Request, context: RouteContext) => {
	try {
		const { commentId } = await context.params;
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return authError("E_AUTH_001", "로그인이 필요합니다.");
		}

		const body = await request.json();
		const result = await fetchBackend(`/api/v1/comments/${commentId}`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${accessToken}` },
			body
		});

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		return NextResponse.json(result.data);
	} catch (error) {
		return networkError(error);
	}
};

export const DELETE = async (_request: Request, context: RouteContext) => {
	try {
		const { commentId } = await context.params;
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return authError("E_AUTH_001", "로그인이 필요합니다.");
		}

		const result = await fetchBackend(`/api/v1/comments/${commentId}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		return NextResponse.json(result.data);
	} catch (error) {
		return networkError(error);
	}
};
