"use client";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { TagInput } from "./TagInput";

const meta = {
	title: "Shared/TagInput",
	component: TagInput,
	args: {
		value: [],
		onChange: () => {},
		placeholder: "태그 입력 후 Enter"
	},
	argTypes: {
		maxTags: {
			control: { type: "number", min: 1, max: 20 },
			description: "최대 태그 수"
		},
		placeholder: {
			control: "text",
			description: "플레이스홀더 텍스트"
		}
	}
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTags: Story = {
	args: {
		value: ["정치", "경제", "사회"]
	}
};

export const MaxReached: Story = {
	args: {
		value: ["정치", "경제", "사회", "문화", "IT"],
		maxTags: 5
	}
};

function InteractiveDemo() {
	const [tags, setTags] = useState<string[]>(["정치"]);

	return (
		<div className="max-w-md space-y-4">
			<TagInput value={tags} onChange={setTags} maxTags={5} />
			<p className="text-fg-secondary text-sm">
				태그: <strong className="text-fg">{tags.join(", ") || "(없음)"}</strong>
			</p>
		</div>
	);
}

export const Interactive: Story = {
	render: () => <InteractiveDemo />
};
