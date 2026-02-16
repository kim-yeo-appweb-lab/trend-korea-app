"use client";

import { Filter, FilterGroup } from "@kim-yeo-appweb-lab/ui";

import { type TimelineFilterState } from "../types";

type TimelineFilterProps = {
	filter: TimelineFilterState;
	onCategoryChange: (value: string) => void;
	onRegionChange: (value: string) => void;
	onImportanceChange: (value: string) => void;
};

const CATEGORY_OPTIONS = [
	{ value: "전체", label: "전체" },
	{ value: "정치", label: "정치" },
	{ value: "사회", label: "사회" },
	{ value: "경제", label: "경제" },
	{ value: "사법", label: "사법" },
	{ value: "문화", label: "문화" },
	{ value: "외교안보", label: "외교안보" }
];

const REGION_OPTIONS = [
	{ value: "전국", label: "전국" },
	{ value: "서울", label: "서울" },
	{ value: "경기", label: "경기" },
	{ value: "부산", label: "부산" },
	{ value: "대구", label: "대구" },
	{ value: "인천", label: "인천" }
];

const IMPORTANCE_OPTIONS = [
	{ value: "전체", label: "전체" },
	{ value: "high", label: "높음" },
	{ value: "medium", label: "중간" },
	{ value: "low", label: "낮음" }
];

export function TimelineFilter({ filter, onCategoryChange, onRegionChange, onImportanceChange }: TimelineFilterProps) {
	return (
		<FilterGroup>
			<Filter label="분야" options={CATEGORY_OPTIONS} value={filter.category} onChange={onCategoryChange} />
			<Filter label="지역" options={REGION_OPTIONS} value={filter.region} onChange={onRegionChange} />
			<Filter label="중요도" options={IMPORTANCE_OPTIONS} value={filter.importance} onChange={onImportanceChange} />
		</FilterGroup>
	);
}
