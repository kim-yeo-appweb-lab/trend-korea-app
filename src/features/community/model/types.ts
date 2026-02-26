import { type Tag } from "../../../shared/types/common";

/**
 * 커뮤니티 도메인 타입
 */

export type Post = {
	id: string;
	authorId: string;
	authorNickname: string;
	authorImage?: string;
	title: string;
	content: string;
	tags: Tag[];
	isAnonymous: boolean;
	likeCount: number;
	dislikeCount: number;
	commentCount: number;
	createdAt: string;
	updatedAt?: string;
};

export type PostDetail = Post & {
	isAuthor: boolean;
	userLiked: boolean;
};

export type Comment = {
	id: string;
	postId: string;
	parentId: string | null;
	authorId: string;
	authorNickname: string;
	content: string;
	likeCount: number;
	isAuthor?: boolean;
	userLiked?: boolean;
	createdAt: string;
	updatedAt?: string;
	replies?: Comment[];
};

export type CursorPagination = {
	next: string | null;
	hasMore: boolean;
};

export type PaginatedPosts = {
	items: Post[];
	cursor: CursorPagination;
};

export type PostListParams = {
	cursor?: string;
	limit?: number;
	tab?: CommunityTab;
	categories?: string;
	sortBy?: string;
};

export type VoteType = "like" | "dislike";

export type VoteResponse = {
	postId: string;
	type: VoteType;
	likeCount: number;
	dislikeCount: number;
	userAction: VoteType | null;
};

export type CommentLikeResponse = {
	commentId: string;
	likeCount: number;
	userLiked: boolean;
};

/**
 * 커뮤니티 UI 타입
 */

export type CommunityTab = "latest" | "popular" | "hot";

export type CommunitySortOption = "latest" | "popular" | "comments";
