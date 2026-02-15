"use client";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Button } from "./Button";
import { Modal } from "./Modal";

const meta = {
	title: "Shared/Modal",
	component: Modal,
	argTypes: {
		open: {
			control: "boolean",
			description: "모달 표시 여부"
		},
		title: {
			control: "text",
			description: "모달 헤더 제목"
		}
	}
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: true,
		title: "모달 제목",
		children: "모달 본문 내용입니다.",
		onClose: () => {}
	}
};

export const WithoutTitle: Story = {
	args: {
		open: true,
		children: "제목 없는 모달입니다.",
		onClose: () => {}
	}
};

function InteractiveDemo() {
	const [open, setOpen] = useState(false);

	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	return (
		<>
			<Button onClick={handleOpen}>모달 열기</Button>
			<Modal open={open} onClose={handleClose} title="확인">
				<p className="text-fg-secondary text-sm">정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
				<div className="mt-4 flex justify-end gap-2">
					<Button variant="secondary" size="sm" onClick={handleClose}>
						취소
					</Button>
					<Button size="sm" onClick={handleClose}>
						삭제
					</Button>
				</div>
			</Modal>
		</>
	);
}

export const Interactive: Story = {
	args: {
		open: false,
		onClose: () => {},
		children: null
	},
	render: () => <InteractiveDemo />
};
