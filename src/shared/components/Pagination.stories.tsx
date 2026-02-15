"use client";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Pagination } from "./Pagination";

const meta = {
	title: "Shared/Pagination",
	component: Pagination,
	args: {
		currentPage: 1,
		totalPages: 10,
		onPageChange: () => {}
	},
	argTypes: {
		currentPage: {
			control: { type: "number", min: 1 },
			description: "현재 페이지"
		},
		totalPages: {
			control: { type: "number", min: 1 },
			description: "전체 페이지 수"
		}
	}
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstPage: Story = {
	args: {
		currentPage: 1,
		totalPages: 10
	}
};

export const MiddlePage: Story = {
	args: {
		currentPage: 5,
		totalPages: 10
	}
};

export const LastPage: Story = {
	args: {
		currentPage: 10,
		totalPages: 10
	}
};

export const FewPages: Story = {
	args: {
		currentPage: 2,
		totalPages: 3
	}
};

export const ManyPages: Story = {
	args: {
		currentPage: 15,
		totalPages: 50
	}
};

function InteractiveDemo() {
	const [page, setPage] = useState(1);

	return (
		<div className="space-y-4">
			<Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
			<p className="text-fg-secondary text-center text-sm">
				현재 페이지: <strong className="text-fg">{page}</strong> / 20
			</p>
		</div>
	);
}

export const Interactive: Story = {
	render: () => <InteractiveDemo />
};
