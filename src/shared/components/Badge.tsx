import { type HTMLAttributes, type Ref } from "react";

import { type Importance, type IssueStatus } from "../types";
import { cn } from "../utils";

type BadgeVariant = "default" | "status" | "importance" | "tag" | "breaking" | "urgent" | "new";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	variant?: BadgeVariant;
	status?: IssueStatus;
	importance?: Importance;
	ref?: Ref<HTMLSpanElement>;
};

const statusStyles: Record<IssueStatus, string> = {
	ongoing: "bg-status-ongoing-bg text-status-ongoing",
	closed: "bg-status-closed-bg text-status-closed",
	reignited: "bg-status-reignited-bg text-status-reignited",
	unverified: "bg-status-unverified-bg text-status-unverified"
};

const statusLabels: Record<IssueStatus, string> = {
	ongoing: "진행중",
	closed: "종결",
	reignited: "재점화",
	unverified: "확인필요"
};

const importanceStyles: Record<Importance, string> = {
	high: "bg-status-ongoing-bg text-status-ongoing",
	medium: "bg-status-reignited-bg text-status-reignited",
	low: "bg-surface-alt text-fg-muted"
};

const importanceLabels: Record<Importance, string> = {
	high: "높음",
	medium: "중간",
	low: "낮음"
};

const labelBadgeStyles: Record<string, { style: string; label: string }> = {
	breaking: { style: "bg-badge-breaking-bg text-badge-breaking", label: "속보" },
	urgent: { style: "bg-badge-urgent-bg text-badge-urgent", label: "긴급" },
	new: { style: "bg-badge-new-bg text-badge-new", label: "NEW" }
};

export function Badge({ variant = "default", status, importance, className, ref, children, ...rest }: BadgeProps) {
	function getVariantStyles() {
		if (variant === "status" && status) {
			return statusStyles[status];
		}
		if (variant === "importance" && importance) {
			return importanceStyles[importance];
		}
		if (variant in labelBadgeStyles) {
			return labelBadgeStyles[variant].style;
		}
		if (variant === "tag") {
			return "bg-subtle text-fg-secondary";
		}
		return "bg-surface-alt text-fg-secondary";
	}

	function getLabel() {
		if (variant === "status" && status) {
			return statusLabels[status];
		}
		if (variant === "importance" && importance) {
			return importanceLabels[importance];
		}
		if (variant in labelBadgeStyles) {
			return children ?? labelBadgeStyles[variant].label;
		}
		return children;
	}

	return (
		<span
			ref={ref}
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
				getVariantStyles(),
				className
			)}
			role={variant === "status" ? "status" : undefined}
			aria-label={
				variant === "status" && status
					? `상태: ${statusLabels[status]}`
					: variant === "importance" && importance
						? `중요도: ${importanceLabels[importance]}`
						: undefined
			}
			{...rest}
		>
			{getLabel()}
		</span>
	);
}
