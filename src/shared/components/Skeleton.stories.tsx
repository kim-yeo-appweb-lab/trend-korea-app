import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./Skeleton";

const meta = {
	title: "Shared/Skeleton",
	component: Skeleton
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: "h-4 w-48"
	}
};

export const Circle: Story = {
	args: {
		className: "h-10 w-10 rounded-full"
	}
};

export const CardSkeleton: Story = {
	render: () => (
		<div className="border-border bg-surface w-80 space-y-3 rounded-xl border p-4">
			<div className="flex items-center gap-3">
				<Skeleton className="h-10 w-10 rounded-full" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-3 w-16" />
				</div>
			</div>
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-32 w-full rounded-lg" />
		</div>
	)
};

export const ListSkeleton: Story = {
	render: () => (
		<div className="w-80 space-y-4">
			{Array.from({ length: 3 }, (_, i) => (
				<div key={i} className="flex items-center gap-3">
					<Skeleton className="h-12 w-12 rounded-lg" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			))}
		</div>
	)
};
