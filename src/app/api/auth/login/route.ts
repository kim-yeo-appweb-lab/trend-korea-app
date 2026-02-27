import { NextResponse } from "next/server";

import { networkError } from "../../../../shared/lib/apiResponse";
import { setAuthCookies } from "../../../../shared/lib/cookies";
import { fetchBackend } from "../../../../shared/lib/fetchBackend";

type LoginResponse = {
	data: {
		user: { id: string; nickname: string; email: string };
		tokens: { accessToken: string; refreshToken: string };
	};
	message: string;
	timestamp: string;
};

export const POST = async (request: Request) => {
	try {
		const body = await request.json();

		const result = await fetchBackend<LoginResponse>("/api/v1/auth/login", {
			method: "POST",
			body
		});

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		await setAuthCookies(result.data.data.tokens.accessToken, result.data.data.tokens.refreshToken);

		return NextResponse.json({
			success: true,
			data: { user: result.data.data.user },
			message: result.data.message,
			timestamp: result.data.timestamp
		});
	} catch (error) {
		return networkError(error);
	}
};
