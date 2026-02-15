import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";
import { SectionHeader } from "./SectionHeader";

const meta = {
	title: "Shared/SectionHeader",
	component: SectionHeader,
	args: {
		title: "실시간 이슈"
	},
	argTypes: {
		title: {
			control: "text",
			description: "섹션 제목"
		},
		href: {
			control: "text",
			description: "더보기 링크 URL"
		},
		linkLabel: {
			control: "text",
			description: '더보기 링크 텍스트 (기본: "더보기")'
		}
	}
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLink: Story = {
	args: {
		href: "/issues",
		linkLabel: "더보기"
	}
};

export const WithChildren: Story = {
	render: (args) => (
		<SectionHeader {...args} title="인기 게시글" href="/community">
			<Badge colorScheme="blue">NEW</Badge>
		</SectionHeader>
	)
};
