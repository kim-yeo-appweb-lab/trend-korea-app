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
	}),

	// ─── 게시글 (Posts) ─────────────────────────

	http.get(`${API_BASE}/posts`, ({ request }) => {
		const url = new URL(request.url);
		const tab = url.searchParams.get("tab") ?? "latest";
		const limit = Number(url.searchParams.get("limit") ?? "10");

		const mockPosts = Array.from({ length: limit }, (_, i) => ({
			id: `post_${i + 1}`,
			authorId: "test-user-id",
			authorNickname: "테스트유저",
			title: `${tab} 게시글 ${i + 1}`,
			content: `게시글 내용 ${i + 1}`,
			tags: [{ id: "tag_1", name: "정치", type: "category", slug: "politics" }],
			isAnonymous: false,
			likeCount: 10 - i,
			dislikeCount: 0,
			commentCount: 3,
			createdAt: "2026-02-15T10:30:00.000Z",
			updatedAt: "2026-02-15T10:30:00.000Z"
		}));

		return HttpResponse.json({
			success: true,
			data: {
				items: mockPosts,
				cursor: { next: "next-cursor-token", hasMore: true }
			},
			message: "조회 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.get(`${API_BASE}/posts/:postId`, ({ params }) => {
		const { postId } = params;

		if (postId === "not-found") {
			return HttpResponse.json(
				{
					success: false,
					error: { code: "E_RESOURCE_003", message: "게시글을 찾을 수 없습니다.", details: {} },
					timestamp: new Date().toISOString()
				},
				{ status: 404 }
			);
		}

		return HttpResponse.json({
			success: true,
			data: {
				id: postId,
				authorId: "test-user-id",
				authorNickname: "테스트유저",
				title: "테스트 게시글",
				content: "게시글 상세 내용입니다",
				tags: [{ id: "tag_1", name: "정치", type: "category", slug: "politics" }],
				isAnonymous: false,
				likeCount: 10,
				dislikeCount: 2,
				commentCount: 3,
				createdAt: "2026-02-15T10:30:00.000Z",
				updatedAt: "2026-02-15T10:30:00.000Z",
				isAuthor: true,
				userLiked: false
			},
			message: "조회 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.post(`${API_BASE}/posts`, async ({ request }) => {
		const body = (await request.json()) as { title: string; content: string; tagIds?: string[]; isAnonymous: boolean };

		return HttpResponse.json(
			{
				success: true,
				data: {
					id: "new-post-id",
					authorId: "test-user-id",
					authorNickname: "테스트유저",
					title: body.title,
					content: body.content,
					tags: [],
					isAnonymous: body.isAnonymous,
					likeCount: 0,
					dislikeCount: 0,
					commentCount: 0,
					createdAt: new Date().toISOString()
				},
				message: "게시글 생성 성공",
				timestamp: new Date().toISOString()
			},
			{ status: 201 }
		);
	}),

	http.patch(`${API_BASE}/posts/:postId`, async ({ params, request }) => {
		const { postId } = params;
		const body = (await request.json()) as { title?: string; content?: string };

		return HttpResponse.json({
			success: true,
			data: {
				id: postId,
				title: body.title ?? "기존 제목",
				updatedAt: new Date().toISOString()
			},
			message: "게시글 수정 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.delete(`${API_BASE}/posts/:postId`, () => {
		return HttpResponse.json({
			success: true,
			data: null,
			message: "게시글 삭제 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.post(`${API_BASE}/posts/:postId/like`, async ({ params, request }) => {
		const { postId } = params;
		const body = (await request.json()) as { type: string };

		return HttpResponse.json({
			success: true,
			data: {
				postId,
				type: body.type,
				likeCount: body.type === "like" ? 11 : 10,
				dislikeCount: body.type === "dislike" ? 3 : 2,
				userAction: body.type
			},
			message: "추천 성공",
			timestamp: new Date().toISOString()
		});
	}),

	// ─── 댓글 (Comments) ────────────────────────

	http.get(`${API_BASE}/posts/:postId/comments`, () => {
		return HttpResponse.json({
			success: true,
			data: [
				{
					id: "comment_1",
					postId: "post_1",
					parentId: null,
					authorId: "test-user-id",
					authorNickname: "테스트유저",
					content: "첫 번째 댓글입니다",
					likeCount: 5,
					isAuthor: true,
					userLiked: false,
					createdAt: "2026-02-15T10:35:00.000Z",
					updatedAt: "2026-02-15T10:35:00.000Z",
					replies: [
						{
							id: "comment_2",
							postId: "post_1",
							parentId: "comment_1",
							authorId: "user_other",
							authorNickname: "다른유저",
							content: "대댓글입니다",
							likeCount: 2,
							isAuthor: false,
							userLiked: false,
							createdAt: "2026-02-15T10:40:00.000Z",
							updatedAt: "2026-02-15T10:40:00.000Z"
						}
					]
				}
			],
			message: "조회 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.post(`${API_BASE}/posts/:postId/comments`, async ({ params, request }) => {
		const { postId } = params;
		const body = (await request.json()) as { content: string; parentId?: string | null };

		return HttpResponse.json(
			{
				success: true,
				data: {
					id: "new-comment-id",
					postId,
					parentId: body.parentId ?? null,
					authorId: "test-user-id",
					authorNickname: "테스트유저",
					content: body.content,
					likeCount: 0,
					createdAt: new Date().toISOString()
				},
				message: "댓글 생성 성공",
				timestamp: new Date().toISOString()
			},
			{ status: 201 }
		);
	}),

	http.patch(`${API_BASE}/comments/:commentId`, async ({ params, request }) => {
		const { commentId } = params;
		const body = (await request.json()) as { content: string };

		return HttpResponse.json({
			success: true,
			data: {
				id: commentId,
				content: body.content,
				updatedAt: new Date().toISOString()
			},
			message: "댓글 수정 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.delete(`${API_BASE}/comments/:commentId`, () => {
		return HttpResponse.json({
			success: true,
			data: null,
			message: "댓글 삭제 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.post(`${API_BASE}/comments/:commentId/like`, ({ params }) => {
		const { commentId } = params;

		return HttpResponse.json({
			success: true,
			data: { commentId, likeCount: 6, userLiked: true },
			message: "좋아요 성공",
			timestamp: new Date().toISOString()
		});
	}),

	http.delete(`${API_BASE}/comments/:commentId/like`, ({ params }) => {
		const { commentId } = params;

		return HttpResponse.json({
			success: true,
			data: { commentId, likeCount: 5, userLiked: false },
			message: "좋아요 취소 성공",
			timestamp: new Date().toISOString()
		});
	})
];
