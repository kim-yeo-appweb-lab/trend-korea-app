"use client";

import { useState } from "react";

import { type TimelineFilterState, type TimelineSortOption } from "../types";

export function useTimelineFilter() {
	const [filter, setFilter] = useState<TimelineFilterState>({
		category: "전체",
		region: "전국",
		importance: "전체"
	});
	const [sort, setSort] = useState<TimelineSortOption>("latest");

	function handleCategoryChange(value: string) {
		setFilter((prev) => ({ ...prev, category: value }));
	}

	function handleRegionChange(value: string) {
		setFilter((prev) => ({ ...prev, region: value }));
	}

	function handleImportanceChange(value: string) {
		setFilter((prev) => ({ ...prev, importance: value }));
	}

	function handleSortChange(value: TimelineSortOption) {
		setSort(value);
	}

	return {
		filter,
		sort,
		handleCategoryChange,
		handleRegionChange,
		handleImportanceChange,
		handleSortChange
	};
}
