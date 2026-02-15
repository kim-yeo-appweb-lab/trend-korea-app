import { type Importance, type IssueStatus } from "../types";

type BadgeColorScheme = "default" | "green" | "red" | "amber" | "blue" | "gray";

type BadgeMapping = {
	colorScheme: BadgeColorScheme;
	label: string;
};

export const issueStatusBadgeMap: Record<IssueStatus, BadgeMapping> = {
	ongoing: { colorScheme: "green", label: "진행중" },
	closed: { colorScheme: "gray", label: "종결" },
	reignited: { colorScheme: "amber", label: "재점화" },
	unverified: { colorScheme: "red", label: "확인필요" }
};

export const importanceBadgeMap: Record<Importance, BadgeMapping> = {
	high: { colorScheme: "green", label: "높음" },
	medium: { colorScheme: "amber", label: "중간" },
	low: { colorScheme: "gray", label: "낮음" }
};
