import { type HTMLAttributes, type Ref } from "react";

import { cn } from "../utils";

type BadgeVariant = "subtle" | "outline";

type BadgeColorScheme = "default" | "green" | "red" | "amber" | "blue" | "gray";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	variant?: BadgeVariant;
	colorScheme?: BadgeColorScheme;
	ref?: Ref<HTMLSpanElement>;
};

const colorSchemeStyles: Record<BadgeColorScheme, Record<BadgeVariant, string>> = {
	default: {
		subtle: "bg-surface-alt text-fg-secondary",
		outline: "border-border text-fg-secondary border"
	},
	green: {
		subtle: "bg-status-ongoing-bg text-status-ongoing",
		outline: "border-status-ongoing text-status-ongoing border"
	},
	red: {
		subtle: "bg-badge-breaking-bg text-badge-breaking",
		outline: "border-badge-breaking text-badge-breaking border"
	},
	amber: {
		subtle: "bg-status-reignited-bg text-status-reignited",
		outline: "border-status-reignited text-status-reignited border"
	},
	blue: {
		subtle: "bg-badge-new-bg text-badge-new",
		outline: "border-badge-new text-badge-new border"
	},
	gray: {
		subtle: "bg-status-closed-bg text-status-closed",
		outline: "border-status-closed text-status-closed border"
	}
};

export function Badge({ variant = "subtle", colorScheme = "default", className, ref, children, ...rest }: BadgeProps) {
	return (
		<span
			ref={ref}
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
				colorSchemeStyles[colorScheme][variant],
				className
			)}
			{...rest}
		>
			{children}
		</span>
	);
}
