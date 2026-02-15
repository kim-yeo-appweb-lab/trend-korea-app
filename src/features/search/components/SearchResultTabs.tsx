"use client";

import { TabList } from "../../../shared/components";
import { type SearchTab } from "../types";

type SearchResultTabsProps = {
	value: SearchTab;
	onChange: (value: SearchTab) => void;
	counts: Record<SearchTab, number>;
};

export function SearchResultTabs({ value, onChange, counts }: SearchResultTabsProps) {
	const items = [
		{ value: "all" as const, label: `전체 ${counts.all}` },
		{ value: "events" as const, label: `사건 ${counts.events}` },
		{ value: "issues" as const, label: `이슈 ${counts.issues}` },
		{ value: "community" as const, label: `커뮤니티 ${counts.community}` }
	];

	return <TabList items={items} value={value} onChange={onChange} variant="underline" />;
}
