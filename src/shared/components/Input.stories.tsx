import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta = {
	title: "Shared/Input",
	component: Input,
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "filled"],
			description: "입력 필드 변형"
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "입력 필드 크기"
		},
		disabled: {
			control: "boolean",
			description: "비활성화 상태"
		}
	}
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "텍스트를 입력하세요"
	}
};

export const Filled: Story = {
	args: {
		variant: "filled",
		placeholder: "텍스트를 입력하세요"
	}
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "검색어를 입력하세요..."
	}
};

export const Disabled: Story = {
	args: {
		placeholder: "비활성화된 입력",
		disabled: true
	}
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex max-w-sm flex-col gap-3">
			<Input variant="default" placeholder="Default 변형" />
			<Input variant="filled" placeholder="Filled 변형" />
		</div>
	)
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex max-w-sm flex-col gap-3">
			<Input size="sm" placeholder="Small (32px)" />
			<Input size="md" placeholder="Medium (40px)" />
			<Input size="lg" placeholder="Large (48px)" />
		</div>
	)
};
