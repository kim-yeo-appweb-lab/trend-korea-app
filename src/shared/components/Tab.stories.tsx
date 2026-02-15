"use client";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { TabList } from "./Tab";

const sampleItems = [
	{ value: "all", label: "전체" },
	{ value: "politics", label: "정치" },
	{ value: "economy", label: "경제" },
	{ value: "society", label: "사회" },
	{ value: "culture", label: "문화" }
];

const meta = {
	title: "Shared/TabList",
	component: TabList,
	args: {
		items: sampleItems,
		value: "all",
		onChange: () => {}
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["filled", "underline"],
			description: "탭 변형"
		},
		size: {
			control: "select",
			options: ["sm", "md"],
			description: "탭 크기"
		}
	}
} satisfies Meta<typeof TabList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
	args: {
		variant: "filled"
	}
};

export const Underline: Story = {
	args: {
		variant: "underline"
	}
};

export const Small: Story = {
	args: {
		size: "sm"
	}
};

function InteractiveDemo() {
	const [value, setValue] = useState("all");

	return (
		<div className="space-y-4">
			<TabList items={sampleItems} value={value} onChange={setValue} variant="filled" />
			<p className="text-fg-secondary text-sm">
				선택된 탭: <strong className="text-fg">{value}</strong>
			</p>
		</div>
	);
}

export const Interactive: Story = {
	render: () => <InteractiveDemo />
};
