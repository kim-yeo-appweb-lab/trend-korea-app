"use client";

import { useState } from "react";

import { Button, Filter, FilterGroup } from "../../../shared/components";

type SearchFilterProps = {
	className?: string;
};

const CATEGORY_OPTIONS = [
	{ value: "전체", label: "전체" },
	{ value: "정치", label: "정치" },
	{ value: "사회", label: "사회" },
	{ value: "경제", label: "경제" },
	{ value: "문화", label: "문화" }
];

const PERIOD_OPTIONS = [
	{ value: "all", label: "전체" },
	{ value: "1w", label: "1주" },
	{ value: "1m", label: "1개월" },
	{ value: "3m", label: "3개월" }
];

export function SearchFilter({ className }: SearchFilterProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [category, setCategory] = useState("전체");
	const [period, setPeriod] = useState("all");

	function handleToggle() {
		setIsOpen((prev) => !prev);
	}

	function handleCategoryChange(value: string) {
		setCategory(value);
	}

	function handlePeriodChange(value: string) {
		setPeriod(value);
	}

	return (
		<div className={className}>
			<Button variant="ghost" size="sm" onClick={handleToggle}>
				{isOpen ? "필터 접기" : "고급 필터"}
				<svg
					className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</Button>
			{isOpen && (
				<div className="mt-3">
					<FilterGroup>
						<Filter label="분야" options={CATEGORY_OPTIONS} value={category} onChange={handleCategoryChange} />
						<Filter label="기간" options={PERIOD_OPTIONS} value={period} onChange={handlePeriodChange} />
					</FilterGroup>
				</div>
			)}
		</div>
	);
}
