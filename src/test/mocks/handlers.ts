import { http, HttpResponse } from "msw";

const API_BASE = "/api";

const mockUser = {
	id: "test-user-id",
	email: "test@example.com",
	nickname: "테스트유저",
	profileImage: null,
	role: "member",
	socialProviders: [],
	trackedIssueIds: [],
	savedEventIds: [],
	createdAt: "2026-01-01T00:00:00.000Z",
	updatedAt: "2026-01-01T00:00:00.000Z"
};

const _mockTokens = {
	accessToken: "mock-access-token",
	refreshToken: "mock-refresh-token",
	expiresIn: 3600,
	expiresAt: "2026-01-01T01:00:00.000Z"
};

export const handlers = [
	http.post(`${API_BASE}/auth/login`, async ({ request }) => {
		const body = (await request.json()) as { email: string; password: string };

		if (body.email === "test@example.com" && body.password === "Password123!") {
			return HttpResponse.json({
				success: true,
				data: { user: mockUser },
				message: "로그인 성공",
				timestamp: new Date().toISOString()
			});
		}

		return HttpResponse.json(
			{
				success: false,
				error: {
					code: "E_AUTH_004",
					message: "이메일 또는 비밀번호가 일치하지 않습니다.",
					details: {}
				},
				timestamp: new Date().toISOString()
			},
			{ status: 401 }
		);
	}),

	http.post(`${API_BASE}/auth/register`, async ({ request }) => {
		const body = (await request.json()) as { email: string; nickname: string; password: string };

		if (body.email === "existing@example.com") {
			return HttpResponse.json(
				{
					success: false,
					error: {
						code: "E_CONFLICT_001",
						message: "이미 가입된 이메일입니다.",
						details: {}
					},
					timestamp: new Date().toISOString()
				},
				{ status: 409 }
			);
		}

		if (body.nickname === "기존닉네임") {
			return HttpResponse.json(
				{
					success: false,
					error: {
						code: "E_CONFLICT_002",
						message: "이미 사용 중인 닉네임입니다.",
						details: {}
					},
					timestamp: new Date().toISOString()
				},
				{ status: 409 }
			);
		}

		return HttpResponse.json(
			{
				success: true,
				data: {
					user: { ...mockUser, email: body.email, nickname: body.nickname }
				},
				message: "회원가입 성공",
				timestamp: new Date().toISOString()
			},
			{ status: 201 }
		);
	}),

	http.post(`${API_BASE}/auth/logout`, () => {
		return HttpResponse.json({
			success: true,
			data: null,
			message: "로그아웃 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.post(`${API_BASE}/auth/refresh`, () => {
		return HttpResponse.json({
			success: true,
			data: {
				accessToken: "new-mock-access-token",
				expiresIn: 3600,
				expiresAt: "2026-01-01T02:00:00.000Z"
			},
			message: "토큰 갱신 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.get(`${API_BASE}/auth/me`, () => {
		return HttpResponse.json({
			success: true,
			data: mockUser,
			message: "조회 성공",
			timestamp: new Date().toISOString()
		});
	})
];
