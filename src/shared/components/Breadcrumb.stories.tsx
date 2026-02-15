import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Breadcrumb } from "./Breadcrumb";

const meta = {
	title: "Shared/Breadcrumb",
	component: Breadcrumb,
	argTypes: {
		items: {
			description: "경로 아이템 배열 ({ label, href? })"
		}
	}
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [{ label: "홈", href: "/" }, { label: "이슈 추적", href: "/issues" }, { label: "윤석열 대통령 탄핵" }]
	}
};

export const TwoLevels: Story = {
	args: {
		items: [{ label: "홈", href: "/" }, { label: "커뮤니티" }]
	}
};

export const DeepNesting: Story = {
	args: {
		items: [
			{ label: "홈", href: "/" },
			{ label: "타임라인", href: "/timeline" },
			{ label: "2024년 1월", href: "/timeline/2024-01" },
			{ label: "15일" }
		]
	}
};

export const SingleItem: Story = {
	args: {
		items: [{ label: "홈" }]
	}
};
