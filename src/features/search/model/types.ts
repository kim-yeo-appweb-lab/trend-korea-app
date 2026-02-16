export type SearchTab = "all" | "events" | "issues" | "community";

export type SearchSortOption = "relevance" | "latest" | "popular";

export type SearchResultItem = {
	id: string;
	type: "event" | "issue" | "post";
	title: string;
	summary: string;
	date: string;
	tags: string[];
};
