import { NextResponse } from "next/server";

import { clearAuthCookies, getAccessToken } from "../../../../shared/lib/cookies";
import { fetchBackend } from "../../../../shared/lib/fetchBackend";

export const POST = async () => {
	try {
		const accessToken = await getAccessToken();

		if (accessToken) {
			await fetchBackend("/api/v1/auth/logout", {
				method: "POST",
				headers: { Authorization: `Bearer ${accessToken}` }
			});
		}
	} catch {
		// 백엔드 로그아웃 실패해도 쿠키는 삭제
	}

	await clearAuthCookies();

	return NextResponse.json({
		success: true,
		data: null,
		message: "로그아웃 성공",
		timestamp: new Date().toISOString()
	});
};
