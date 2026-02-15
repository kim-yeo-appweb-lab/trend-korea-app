import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";

const meta = {
	title: "Shared/Badge",
	component: Badge,
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "status", "importance", "tag", "breaking", "urgent", "new"],
			description: "배지 변형"
		},
		status: {
			control: "select",
			options: ["ongoing", "closed", "reignited", "unverified"],
			description: "이슈 상태 (variant=status 시 사용)"
		},
		importance: {
			control: "select",
			options: ["high", "medium", "low"],
			description: "중요도 (variant=importance 시 사용)"
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

export const StatusOngoing: Story = {
	args: {
		variant: "status",
		status: "ongoing"
	}
};

export const StatusClosed: Story = {
	args: {
		variant: "status",
		status: "closed"
	}
};

export const StatusReignited: Story = {
	args: {
		variant: "status",
		status: "reignited"
	}
};

export const StatusUnverified: Story = {
	args: {
		variant: "status",
		status: "unverified"
	}
};

export const AllStatuses: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="status" status="ongoing" />
			<Badge variant="status" status="closed" />
			<Badge variant="status" status="reignited" />
			<Badge variant="status" status="unverified" />
		</div>
	)
};

export const ImportanceHigh: Story = {
	args: {
		variant: "importance",
		importance: "high"
	}
};

export const ImportanceMedium: Story = {
	args: {
		variant: "importance",
		importance: "medium"
	}
};

export const ImportanceLow: Story = {
	args: {
		variant: "importance",
		importance: "low"
	}
};

export const AllImportances: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="importance" importance="high" />
			<Badge variant="importance" importance="medium" />
			<Badge variant="importance" importance="low" />
		</div>
	)
};

export const Tag: Story = {
	args: {
		variant: "tag",
		children: "정치"
	}
};

export const Breaking: Story = {
	args: {
		variant: "breaking"
	}
};

export const Urgent: Story = {
	args: {
		variant: "urgent"
	}
};

export const New: Story = {
	args: {
		variant: "new"
	}
};

export const LabelBadges: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="breaking" />
			<Badge variant="urgent" />
			<Badge variant="new" />
		</div>
	)
};
