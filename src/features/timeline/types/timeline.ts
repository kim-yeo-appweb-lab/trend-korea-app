import { type Event } from "../../../shared/types";

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
