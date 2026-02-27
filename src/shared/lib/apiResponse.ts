import { NextResponse } from "next/server";

type ErrorResponseOptions = {
	code: string;
	message: string;
	status: number;
	cause?: unknown;
};

export const errorResponse = ({ code, message, status, cause }: ErrorResponseOptions) => {
	const details =
		process.env.NODE_ENV === "development" && cause
			? { cause: cause instanceof Error ? cause.message : String(cause) }
			: {};

	return NextResponse.json(
		{
			success: false,
			error: { code, message, details },
			timestamp: new Date().toISOString()
		},
		{ status }
	);
};

export const networkError = (cause?: unknown) =>
	errorResponse({
		code: "E_NETWORK",
		message: "서버에 연결할 수 없습니다.",
		status: 502,
		cause
	});

export const authError = (code: string, message: string) => errorResponse({ code, message, status: 401 });
