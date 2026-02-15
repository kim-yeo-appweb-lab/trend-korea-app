"use client";

import { Select } from "../../../shared/components";
import { type IssueSortOption } from "../types";

type IssueSortSelectProps = {
	value: IssueSortOption;
	onChange: (value: IssueSortOption) => void;
};

const SORT_OPTIONS = [
	{ value: "latest" as const, label: "최신순" },
	{ value: "trackers" as const, label: "추적자순" },
	{ value: "importance" as const, label: "중요도순" }
];

export function IssueSortSelect({ value, onChange }: IssueSortSelectProps) {
	return <Select options={SORT_OPTIONS} value={value} onChange={onChange} />;
}
