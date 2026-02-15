import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

const meta = {
	title: "Shared/Button",
	component: Button,
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "ghost"],
			description: "버튼 변형"
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "버튼 크기"
		},
		asChild: {
			control: "boolean",
			description: "자식 요소로 렌더링 (Slot 패턴)"
		},
		disabled: {
			control: "boolean",
			description: "비활성화 상태"
		}
	}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Primary 버튼",
		variant: "primary"
	}
};

export const Secondary: Story = {
	args: {
		children: "Secondary 버튼",
		variant: "secondary"
	}
};

export const Ghost: Story = {
	args: {
		children: "Ghost 버튼",
		variant: "ghost"
	}
};

export const Small: Story = {
	args: {
		children: "작은 버튼",
		size: "sm"
	}
};

export const Medium: Story = {
	args: {
		children: "중간 버튼",
		size: "md"
	}
};

export const Large: Story = {
	args: {
		children: "큰 버튼",
		size: "lg"
	}
};

export const Disabled: Story = {
	args: {
		children: "비활성화 버튼",
		disabled: true
	}
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
	)
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	)
};

export const AsChild: Story = {
	render: () => (
		<Button asChild variant="primary">
			<a href="https://example.com">링크로 렌더링</a>
		</Button>
	)
};
