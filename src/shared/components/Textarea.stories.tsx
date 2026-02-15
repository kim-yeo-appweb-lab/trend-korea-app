import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Textarea } from "./Textarea";

const meta = {
	title: "Shared/Textarea",
	component: Textarea,
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "filled"],
			description: "텍스트 영역 변형"
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "텍스트 영역 크기"
		},
		disabled: {
			control: "boolean",
			description: "비활성화 상태"
		}
	}
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "내용을 입력하세요"
	}
};

export const Filled: Story = {
	args: {
		variant: "filled",
		placeholder: "내용을 입력하세요"
	}
};

export const Disabled: Story = {
	args: {
		placeholder: "비활성화된 텍스트 영역",
		disabled: true
	}
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex max-w-md flex-col gap-3">
			<Textarea variant="default" placeholder="Default 변형" />
			<Textarea variant="filled" placeholder="Filled 변형" />
		</div>
	)
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex max-w-md flex-col gap-3">
			<Textarea size="sm" placeholder="Small" />
			<Textarea size="md" placeholder="Medium" />
			<Textarea size="lg" placeholder="Large" />
		</div>
	)
};
