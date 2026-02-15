"use client";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Filter, FilterGroup } from "./Filter";

const periodOptions = [
	{ value: "all", label: "전체" },
	{ value: "today", label: "오늘" },
	{ value: "week", label: "이번 주" },
	{ value: "month", label: "이번 달" },
	{ value: "year", label: "올해" }
];

const categoryOptions = [
	{ value: "all", label: "전체" },
	{ value: "politics", label: "정치" },
	{ value: "economy", label: "경제" },
	{ value: "society", label: "사회" },
	{ value: "culture", label: "문화" },
	{ value: "tech", label: "IT/기술" }
];

const meta = {
	title: "Shared/Filter",
	component: Filter,
	args: {
		label: "기간",
		options: periodOptions,
		value: "all",
		onChange: () => {}
	}
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function PeriodFilterDemo() {
	const [value, setValue] = useState("all");

	return <Filter label="기간" options={periodOptions} value={value} onChange={setValue} />;
}

export const PeriodFilter: Story = {
	render: () => <PeriodFilterDemo />
};

function CategoryFilterDemo() {
	const [value, setValue] = useState("all");

	return <Filter label="분야" options={categoryOptions} value={value} onChange={setValue} />;
}

export const CategoryFilter: Story = {
	render: () => <CategoryFilterDemo />
};

function FilterGroupDemo() {
	const [period, setPeriod] = useState("all");
	const [category, setCategory] = useState("all");

	return (
		<FilterGroup>
			<Filter label="기간" options={periodOptions} value={period} onChange={setPeriod} />
			<Filter label="분야" options={categoryOptions} value={category} onChange={setCategory} />
		</FilterGroup>
	);
}

export const GroupedFilters: Story = {
	render: () => <FilterGroupDemo />
};
