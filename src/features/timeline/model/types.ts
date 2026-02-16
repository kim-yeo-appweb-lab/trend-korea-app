import { type Source, type Tag } from "../../../shared/types/common";

/**
 * 타임라인 도메인 타입
 */

export type Importance = "high" | "medium" | "low";

export type VerificationStatus = "verified" | "unverified";

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

/**
 * 타임라인 UI 타입
 */

export type TimelineSortOption = "latest" | "importance";

export type TimelineFilterState = {
	category: string;
	region: string;
	importance: string;
};

export type TimelineDateGroup = {
	date: string;
	dayOfWeek: string;
	events: Event[];
};
