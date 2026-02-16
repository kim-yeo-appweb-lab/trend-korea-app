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
};

export type Comment = {
	id: string;
	postId: string;
	parentId: string | null;
	authorId: string;
	authorNickname: string;
	content: string;
	likeCount: number;
	createdAt: string;
	replies?: Comment[];
};

/**
 * 커뮤니티 UI 타입
 */

export type CommunityTab = "latest" | "popular" | "hot";

export type CommunitySortOption = "latest" | "popular" | "comments";
