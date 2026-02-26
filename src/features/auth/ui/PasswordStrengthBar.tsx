"use client";

export type PasswordStrength = "weak" | "medium" | "strong";

const STRENGTH_CONFIG = {
	weak: {
		label: "약함",
		color: "bg-danger-500",
		textColor: "text-danger-500"
	},
	medium: {
		label: "보통",
		color: "bg-warning-500",
		textColor: "text-warning-500"
	},
	strong: {
		label: "강함",
		color: "bg-success-500",
		textColor: "text-success-500"
	}
} as const;

export const calculatePasswordStrength = (password: string): PasswordStrength => {
	if (password.length < 6) return "weak";
	if (password.length < 10) return "medium";

	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	const strengthScore = [hasUpperCase, hasLowerCase, hasNumber, hasSpecial].filter(Boolean).length;

	if (strengthScore >= 3) return "strong";
	if (strengthScore >= 2) return "medium";
	return "weak";
};

type PasswordStrengthBarProps = {
	password: string;
};

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
	if (!password) return null;

	const strength = calculatePasswordStrength(password);

	return (
		<div className="animate-in fade-in slide-in-from-top-1 space-y-1.5">
			<div className="flex gap-1">
				<div
					className={`h-1 flex-1 rounded ${strength === "weak" ? STRENGTH_CONFIG.weak.color : "bg-surface-secondary"}`}
				/>
				<div
					className={`h-1 flex-1 rounded ${strength === "medium" || strength === "strong" ? STRENGTH_CONFIG.medium.color : "bg-surface-secondary"}`}
				/>
				<div
					className={`h-1 flex-1 rounded ${strength === "strong" ? STRENGTH_CONFIG.strong.color : "bg-surface-secondary"}`}
				/>
			</div>
			<p className={`text-xs ${STRENGTH_CONFIG[strength].textColor}`}>
				비밀번호 강도: {STRENGTH_CONFIG[strength].label}
			</p>
		</div>
	);
}
