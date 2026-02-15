"use client";

import { Select } from "../../../shared/components";
import { type TimelineSortOption } from "../types";

type TimelineSortSelectProps = {
	value: TimelineSortOption;
	onChange: (value: TimelineSortOption) => void;
};

const SORT_OPTIONS = [
	{ value: "latest" as const, label: "최신순" },
	{ value: "importance" as const, label: "중요도순" }
];

export function TimelineSortSelect({ value, onChange }: TimelineSortSelectProps) {
	return <Select options={SORT_OPTIONS} value={value} onChange={onChange} />;
}
