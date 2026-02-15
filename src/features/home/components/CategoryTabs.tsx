"use client";

import { useState } from "react";

import { TabList } from "../../../shared/components";

const CATEGORY_ITEMS = [
	{ value: "전체", label: "전체" },
	{ value: "정치/사회", label: "정치/사회" },
	{ value: "경제/금융", label: "경제/금융" },
	{ value: "사법", label: "사법" },
	{ value: "재난/환경", label: "재난/환경" },
	{ value: "외교안보", label: "외교안보" },
	{ value: "노동", label: "노동" },
	{ value: "문화", label: "문화" }
] as const;

type CategoryValue = (typeof CATEGORY_ITEMS)[number]["value"];

export function CategoryTabs() {
	const [activeCategory, setActiveCategory] = useState<CategoryValue>("전체");

	function handleCategoryChange(value: CategoryValue) {
		setActiveCategory(value);
	}

	return (
		<nav className="border-border border-b py-3">
			<TabList items={[...CATEGORY_ITEMS]} value={activeCategory} onChange={handleCategoryChange} variant="filled" />
		</nav>
	);
}
