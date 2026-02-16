import { type Source, type Tag } from "../../../shared/types/common";

/**
 * 이슈 도메인 타입
 */

export type IssueStatus = "ongoing" | "closed" | "reignited" | "unverified";

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

/**
 * 이슈 UI 타입
 */

export type IssueSortOption = "latest" | "trackers" | "importance";

export type IssueFilterState = {
	status: string;
	category: string;
	period: string;
};
