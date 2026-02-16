import { type IssueStatus } from "../model";

type BadgeColorScheme = "default" | "success" | "danger" | "warning" | "info" | "neutral";

type BadgeMapping = {
	colorScheme: BadgeColorScheme;
	label: string;
};

export const issueStatusBadgeMap: Record<IssueStatus, BadgeMapping> = {
	ongoing: { colorScheme: "danger", label: "진행중" },
	closed: { colorScheme: "success", label: "종결" },
	reignited: { colorScheme: "warning", label: "재점화" },
	unverified: { colorScheme: "danger", label: "확인필요" }
};
