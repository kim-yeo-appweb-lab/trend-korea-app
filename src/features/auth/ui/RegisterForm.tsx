"use client";

import { Button, Input } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { useState } from "react";

type PasswordStrength = "weak" | "medium" | "strong";

export function RegisterForm() {
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState("");

	function validateEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function calculatePasswordStrength(password: string): PasswordStrength {
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
	}

	const passwordStrength = password ? calculatePasswordStrength(password) : null;
	const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

	const strengthConfig = {
		weak: { label: "약함", color: "bg-danger-500", textColor: "text-danger-500" },
		medium: { label: "보통", color: "bg-warning-500", textColor: "text-warning-500" },
		strong: { label: "강함", color: "bg-success-500", textColor: "text-success-500" }
	};

	function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNickname(e.target.value);
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		setEmail(value);

		if (value && !validateEmail(value)) {
			setEmailError("올바른 이메일 형식이 아닙니다");
		} else {
			setEmailError("");
		}
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setConfirmPassword(e.target.value);
	}

	function togglePasswordVisibility() {
		setShowPassword(!showPassword);
	}

	function toggleConfirmPasswordVisibility() {
		setShowConfirmPassword(!showConfirmPassword);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!validateEmail(email)) {
			setEmailError("올바른 이메일을 입력해주세요");
			return;
		}

		if (passwordMismatch) {
			return;
		}

		setIsLoading(true);
		// TODO: 회원가입 API 호출
		setTimeout(() => setIsLoading(false), 1000);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="reg-nickname" className="text-fg text-sm font-medium">
					닉네임
				</label>
				<Input
					id="reg-nickname"
					value={nickname}
					onChange={handleNicknameChange}
					placeholder="닉네임을 입력하세요"
					autoComplete="username"
					className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="reg-email" className="text-fg text-sm font-medium">
					이메일
				</label>
				<Input
					id="reg-email"
					type="email"
					value={email}
					onChange={handleEmailChange}
					placeholder="이메일을 입력하세요"
					autoComplete="email"
					className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
					aria-invalid={!!emailError}
					aria-describedby={emailError ? "email-error" : undefined}
				/>
				{emailError && (
					<p id="email-error" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						{emailError}
					</p>
				)}
			</div>
			<div className="space-y-2">
				<label htmlFor="reg-password" className="text-fg text-sm font-medium">
					비밀번호
				</label>
				<div className="relative">
					<Input
						id="reg-password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={handlePasswordChange}
						placeholder="비밀번호를 입력하세요"
						autoComplete="new-password"
						className="focus:ring-primary/20 pr-10 transition-all duration-200 focus:ring-2"
					/>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={togglePasswordVisibility}
						className="absolute top-1/2 right-1 -translate-y-1/2 p-2"
						aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
					>
						{showPassword ? (
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
								/>
							</svg>
						) : (
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						)}
					</Button>
				</div>
				{passwordStrength && (
					<div className="animate-in fade-in slide-in-from-top-1 space-y-1.5">
						<div className="flex gap-1">
							<div
								className={`h-1 flex-1 rounded ${passwordStrength === "weak" ? strengthConfig.weak.color : "bg-surface-secondary"}`}
							/>
							<div
								className={`h-1 flex-1 rounded ${passwordStrength === "medium" || passwordStrength === "strong" ? strengthConfig.medium.color : "bg-surface-secondary"}`}
							/>
							<div
								className={`h-1 flex-1 rounded ${passwordStrength === "strong" ? strengthConfig.strong.color : "bg-surface-secondary"}`}
							/>
						</div>
						<p className={`text-xs ${strengthConfig[passwordStrength].textColor}`}>
							비밀번호 강도: {strengthConfig[passwordStrength].label}
						</p>
					</div>
				)}
			</div>
			<div className="space-y-2">
				<label htmlFor="reg-confirm" className="text-fg text-sm font-medium">
					비밀번호 확인
				</label>
				<div className="relative">
					<Input
						id="reg-confirm"
						type={showConfirmPassword ? "text" : "password"}
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						placeholder="비밀번호를 다시 입력하세요"
						autoComplete="new-password"
						className="focus:ring-primary/20 pr-10 transition-all duration-200 focus:ring-2"
						aria-invalid={passwordMismatch}
						aria-describedby={passwordMismatch ? "password-mismatch" : undefined}
					/>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={toggleConfirmPasswordVisibility}
						className="absolute top-1/2 right-1 -translate-y-1/2 p-2"
						aria-label={showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
					>
						{showConfirmPassword ? (
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
								/>
							</svg>
						) : (
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						)}
					</Button>
				</div>
				{passwordMismatch && (
					<p id="password-mismatch" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						비밀번호가 일치하지 않습니다.
					</p>
				)}
			</div>
			<Button
				type="submit"
				className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
				disabled={isLoading || passwordMismatch || !!emailError}
			>
				{isLoading ? "가입 중..." : "회원가입"}
			</Button>
			<p className="text-fg-muted text-center text-sm">
				이미 계정이 있으신가요?{" "}
				<Link
					href="/login"
					className="text-primary hover:text-primary-hover font-medium transition-colors hover:underline"
				>
					로그인
				</Link>
			</p>
		</form>
	);
}
