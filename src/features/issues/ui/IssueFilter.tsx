"use client";

import { Filter, FilterGroup } from "@kim-yeo-appweb-lab/ui";

import { type IssueFilterState } from "../model";

type IssueFilterProps = {
	filter: IssueFilterState;
	onStatusChange: (value: string) => void;
	onCategoryChange: (value: string) => void;
	onPeriodChange: (value: string) => void;
};

const STATUS_OPTIONS = [
	{ value: "전체", label: "전체" },
	{ value: "ongoing", label: "진행중" },
	{ value: "closed", label: "종결" },
	{ value: "reignited", label: "재점화" },
	{ value: "unverified", label: "확인필요" }
];

const CATEGORY_OPTIONS = [
	{ value: "전체", label: "전체" },
	{ value: "정치", label: "정치" },
	{ value: "사회", label: "사회" },
	{ value: "경제", label: "경제" },
	{ value: "사법", label: "사법" },
	{ value: "문화", label: "문화" },
	{ value: "외교안보", label: "외교안보" }
];

const PERIOD_OPTIONS = [
	{ value: "all", label: "전체" },
	{ value: "1w", label: "1주" },
	{ value: "1m", label: "1개월" },
	{ value: "3m", label: "3개월" }
];

export function IssueFilter({ filter, onStatusChange, onCategoryChange, onPeriodChange }: IssueFilterProps) {
	return (
		<FilterGroup>
			<Filter label="상태" options={STATUS_OPTIONS} value={filter.status} onChange={onStatusChange} />
			<Filter label="분야" options={CATEGORY_OPTIONS} value={filter.category} onChange={onCategoryChange} />
			<Filter label="기간" options={PERIOD_OPTIONS} value={filter.period} onChange={onPeriodChange} />
		</FilterGroup>
	);
}
