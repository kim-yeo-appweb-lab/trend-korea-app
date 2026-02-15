import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";

const meta = {
	title: "Shared/Badge",
	component: Badge,
	argTypes: {
		variant: {
			control: "select",
			options: ["subtle", "outline"],
			description: "배지 스타일 변형"
		},
		colorScheme: {
			control: "select",
			options: ["default", "green", "red", "amber", "blue", "gray"],
			description: "색상 팔레트"
		}
	}
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "기본 배지"
	}
};

export const Green: Story = {
	args: {
		colorScheme: "green",
		children: "진행중"
	}
};

export const Red: Story = {
	args: {
		colorScheme: "red",
		children: "속보"
	}
};

export const Amber: Story = {
	args: {
		colorScheme: "amber",
		children: "긴급"
	}
};

export const Blue: Story = {
	args: {
		colorScheme: "blue",
		children: "NEW"
	}
};

export const Gray: Story = {
	args: {
		colorScheme: "gray",
		children: "종결"
	}
};

export const OutlineVariant: Story = {
	args: {
		variant: "outline",
		colorScheme: "green",
		children: "진행중"
	}
};

export const AllColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge>기본</Badge>
			<Badge colorScheme="green">Green</Badge>
			<Badge colorScheme="red">Red</Badge>
			<Badge colorScheme="amber">Amber</Badge>
			<Badge colorScheme="blue">Blue</Badge>
			<Badge colorScheme="gray">Gray</Badge>
		</div>
	)
};

export const AllOutlineColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="outline">기본</Badge>
			<Badge variant="outline" colorScheme="green">
				Green
			</Badge>
			<Badge variant="outline" colorScheme="red">
				Red
			</Badge>
			<Badge variant="outline" colorScheme="amber">
				Amber
			</Badge>
			<Badge variant="outline" colorScheme="blue">
				Blue
			</Badge>
			<Badge variant="outline" colorScheme="gray">
				Gray
			</Badge>
		</div>
	)
};

export const TagExample: Story = {
	args: {
		children: "정치"
	}
};
