import { type User } from "../../features/auth/model/types";
import { type Comment, type Post, type PostDetail } from "../../features/community/model/types";

export const createMockUser = (overrides?: Partial<User>): User => ({
	id: "test-user-id",
	nickname: "테스트유저",
	email: "test@example.com",
	profileImage: null,
	role: "member",
	socialProviders: [],
	trackedIssueIds: [],
	savedEventIds: [],
	createdAt: "2026-01-01T00:00:00.000Z",
	...overrides
});

export const createMockPost = (overrides?: Partial<Post>): Post => ({
	id: "post_1",
	authorId: "test-user-id",
	authorNickname: "테스트유저",
	title: "테스트 게시글",
	content: "게시글 내용입니다",
	tags: [{ id: "tag_1", name: "정치", type: "category", slug: "politics" }],
	isAnonymous: false,
	likeCount: 10,
	dislikeCount: 2,
	commentCount: 3,
	createdAt: "2026-02-15T10:30:00.000Z",
	updatedAt: "2026-02-15T10:30:00.000Z",
	...overrides
});

export const createMockPostDetail = (overrides?: Partial<PostDetail>): PostDetail => ({
	...createMockPost(),
	isAuthor: true,
	userLiked: false,
	...overrides
});

export const createMockComment = (overrides?: Partial<Comment>): Comment => ({
	id: "comment_1",
	postId: "post_1",
	parentId: null,
	authorId: "test-user-id",
	authorNickname: "테스트유저",
	content: "테스트 댓글입니다",
	likeCount: 5,
	isAuthor: true,
	userLiked: false,
	createdAt: "2026-02-15T10:35:00.000Z",
	updatedAt: "2026-02-15T10:35:00.000Z",
	...overrides
});
