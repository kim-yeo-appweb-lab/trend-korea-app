import { type Importance, type IssueStatus, type VerificationStatus } from "./status";

export type Tag = {
	id: string;
	name: string;
	type: "category" | "region";
	slug: string;
};

export type Source = {
	url: string;
	title: string;
	publisher: string;
	publishedAt: string;
};

export type Event = {
	id: string;
	occurredAt: string;
	title: string;
	summary: string;
	tags: Tag[];
	sources: Source[];
	importance: Importance;
	verificationStatus: VerificationStatus;
	relatedIssueIds: string[];
};

export type TriggerType = "article" | "ruling" | "announcement" | "correction" | "status_change";

export type Trigger = {
	id: string;
	issueId: string;
	occurredAt: string;
	summary: string;
	type: TriggerType;
	sources: Source[];
};

export type Issue = {
	id: string;
	title: string;
	description: string;
	status: IssueStatus;
	tags: Tag[];
	triggers: Trigger[];
	trackerCount: number;
	relatedEventIds: string[];
	sources: Source[];
};

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

export type User = {
	id: string;
	nickname: string;
	email: string;
	profileImage: string | null;
	role: "guest" | "member" | "admin";
	socialProviders: ("kakao" | "naver" | "google")[];
	trackedIssueIds: string[];
	savedEventIds: string[];
	createdAt: string;
};
