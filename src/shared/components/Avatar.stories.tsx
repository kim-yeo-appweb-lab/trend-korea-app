import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Avatar } from "./Avatar";

const meta = {
	title: "Shared/Avatar",
	component: Avatar,
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "아바타 크기"
		},
		src: {
			control: "text",
			description: "이미지 URL"
		},
		name: {
			control: "text",
			description: "사용자 이름 (폴백 이니셜 생성에 사용)"
		}
	}
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: "홍길동"
	}
};

export const WithImage: Story = {
	args: {
		name: "홍길동",
		src: "https://picsum.photos/200"
	}
};

export const Small: Story = {
	args: {
		name: "김철수",
		size: "sm"
	}
};

export const Medium: Story = {
	args: {
		name: "김철수",
		size: "md"
	}
};

export const Large: Story = {
	args: {
		name: "김철수",
		size: "lg"
	}
};

export const AllSizes: Story = {
	args: {
		name: "홍길동"
	},
	render: () => (
		<div className="flex items-center gap-3">
			<Avatar name="홍길동" size="sm" />
			<Avatar name="홍길동" size="md" />
			<Avatar name="홍길동" size="lg" />
		</div>
	)
};

export const FallbackInitials: Story = {
	args: {
		name: "Alice"
	},
	render: () => (
		<div className="flex items-center gap-3">
			<Avatar name="Alice" />
			<Avatar name="Bob" />
			<Avatar name="Charlie" />
		</div>
	)
};
