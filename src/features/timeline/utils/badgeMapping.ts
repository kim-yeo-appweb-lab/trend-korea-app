import { type Importance } from "../model";

type BadgeColorScheme = "default" | "success" | "danger" | "warning" | "info" | "neutral";

type BadgeMapping = {
	colorScheme: BadgeColorScheme;
	label: string;
};

export const importanceBadgeMap: Record<Importance, BadgeMapping> = {
	high: { colorScheme: "danger", label: "높음" },
	medium: { colorScheme: "warning", label: "중간" },
	low: { colorScheme: "neutral", label: "낮음" }
};
