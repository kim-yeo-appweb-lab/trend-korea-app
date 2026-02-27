import { NextResponse } from "next/server";

import { authError, networkError } from "../../../shared/lib/apiResponse";
import { getAccessToken } from "../../../shared/lib/cookies";
import { fetchBackend } from "../../../shared/lib/fetchBackend";

export const GET = async (request: Request) => {
	try {
		const { searchParams } = new URL(request.url);
		const result = await fetchBackend(`/api/v1/posts?${searchParams}`);

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		return NextResponse.json(result.data);
	} catch (error) {
		return networkError(error);
	}
};

export const POST = async (request: Request) => {
	try {
		const accessToken = await getAccessToken();
		if (!accessToken) {
			return authError("E_AUTH_001", "로그인이 필요합니다.");
		}

		const body = await request.json();
		const result = await fetchBackend("/api/v1/posts", {
			method: "POST",
			headers: { Authorization: `Bearer ${accessToken}` },
			body
		});

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		return NextResponse.json(result.data, { status: 201 });
	} catch (error) {
		return networkError(error);
	}
};
