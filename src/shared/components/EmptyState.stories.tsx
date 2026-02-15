import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

const meta = {
	title: "Shared/EmptyState",
	component: EmptyState,
	argTypes: {
		title: {
			control: "text",
			description: "빈 상태 제목"
		},
		description: {
			control: "text",
			description: "보조 설명 텍스트"
		}
	}
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "데이터가 없습니다"
	}
};

export const WithDescription: Story = {
	args: {
		title: "검색 결과가 없습니다",
		description: "다른 키워드로 다시 검색해 보세요."
	}
};

export const WithIcon: Story = {
	args: {
		title: "추적 중인 이슈가 없습니다",
		description: "관심 있는 이슈를 추적해 보세요.",
		icon: (
			<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		)
	}
};

export const WithAction: Story = {
	args: {
		title: "게시글이 없습니다",
		description: "첫 번째 게시글을 작성해 보세요.",
		icon: (
			<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
			</svg>
		),
		action: <Button size="sm">글쓰기</Button>
	}
};
