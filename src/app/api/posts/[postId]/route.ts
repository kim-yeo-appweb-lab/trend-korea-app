import { NextResponse } from "next/server";

import { authError, networkError } from "../../../../shared/lib/apiResponse";
import { getAccessToken } from "../../../../shared/lib/cookies";
import { fetchBackend } from "../../../../shared/lib/fetchBackend";

type RouteContext = {
	params: Promise<{ postId: string }>;
};

export const GET = async (_request: Request, context: RouteContext) => {
	try {
		const { postId } = await context.params;
		const accessToken = await getAccessToken();

		const headers: Record<string, string> = {};
		if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

		const result = await fetchBackend(`/api/v1/posts/${postId}`, { headers });

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		return NextResponse.json(result.data);
	} catch (error) {
		return networkError(error);
	}
};

export const PATCH = async (request: Request, context: RouteContext) => {
	try {
		const { postId } = await context.params;
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return authError("E_AUTH_001", "로그인이 필요합니다.");
		}

		const body = await request.json();
		const result = await fetchBackend(`/api/v1/posts/${postId}`, {
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
		const { postId } = await context.params;
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return authError("E_AUTH_001", "로그인이 필요합니다.");
		}

		const result = await fetchBackend(`/api/v1/posts/${postId}`, {
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
