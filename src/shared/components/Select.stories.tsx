"use client";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Select } from "./Select";

const sortOptions = [
	{ value: "latest", label: "최신순" },
	{ value: "popular", label: "인기순" },
	{ value: "comments", label: "댓글순" }
];

const categoryOptions = [
	{ value: "all", label: "전체" },
	{ value: "politics", label: "정치" },
	{ value: "economy", label: "경제" },
	{ value: "society", label: "사회" },
	{ value: "culture", label: "문화" }
];

const meta = {
	title: "Shared/Select",
	component: Select,
	args: {
		options: sortOptions,
		value: "latest",
		onChange: () => {}
	},
	argTypes: {
		disabled: {
			control: "boolean",
			description: "비활성화 상태"
		},
		placeholder: {
			control: "text",
			description: "플레이스홀더 텍스트"
		}
	}
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true
	}
};

export const WithPlaceholder: Story = {
	args: {
		options: categoryOptions,
		value: "" as string,
		placeholder: "분야를 선택하세요"
	}
};

function InteractiveDemo() {
	const [value, setValue] = useState("latest");

	return (
		<div className="space-y-4">
			<Select options={sortOptions} value={value} onChange={setValue} />
			<p className="text-fg-secondary text-sm">
				선택된 값: <strong className="text-fg">{value}</strong>
			</p>
		</div>
	);
}

export const Interactive: Story = {
	render: () => <InteractiveDemo />
};
