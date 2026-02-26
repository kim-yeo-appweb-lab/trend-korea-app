"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useRegister } from "../model/hooks";
import { type RegisterFormValues, registerSchema } from "../model/schemas";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrengthBar } from "./PasswordStrengthBar";

export function RegisterForm() {
	const registerMutation = useRegister();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			nickname: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const watchedPassword = watch("password");

	const onSubmit = (data: RegisterFormValues) => {
		registerMutation.mutate({
			nickname: data.nickname,
			email: data.email,
			password: data.password
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
			<div className="space-y-2">
				<label htmlFor="reg-nickname" className="text-fg text-sm font-medium">
					닉네임
				</label>
				<Input
					id="reg-nickname"
					placeholder="닉네임을 입력하세요"
					autoComplete="username"
					className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
					aria-invalid={!!errors.nickname}
					aria-describedby={errors.nickname ? "reg-nickname-error" : undefined}
					{...register("nickname")}
				/>
				{errors.nickname && (
					<p id="reg-nickname-error" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						{errors.nickname.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label htmlFor="reg-email" className="text-fg text-sm font-medium">
					이메일
				</label>
				<Input
					id="reg-email"
					type="email"
					placeholder="이메일을 입력하세요"
					autoComplete="email"
					className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
					aria-invalid={!!errors.email}
					aria-describedby={errors.email ? "reg-email-error" : undefined}
					{...register("email")}
				/>
				{errors.email && (
					<p id="reg-email-error" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						{errors.email.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label htmlFor="reg-password" className="text-fg text-sm font-medium">
					비밀번호
				</label>
				<PasswordInput
					id="reg-password"
					placeholder="비밀번호를 입력하세요"
					autoComplete="new-password"
					aria-invalid={!!errors.password}
					aria-describedby={errors.password ? "reg-password-error" : undefined}
					{...register("password")}
				/>
				{errors.password && (
					<p id="reg-password-error" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						{errors.password.message}
					</p>
				)}
				<PasswordStrengthBar password={watchedPassword} />
			</div>

			<div className="space-y-2">
				<label htmlFor="reg-confirm" className="text-fg text-sm font-medium">
					비밀번호 확인
				</label>
				<PasswordInput
					id="reg-confirm"
					placeholder="비밀번호를 다시 입력하세요"
					autoComplete="new-password"
					aria-invalid={!!errors.confirmPassword}
					aria-describedby={errors.confirmPassword ? "reg-confirm-error" : undefined}
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && (
					<p id="reg-confirm-error" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			{registerMutation.error && (
				<p className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-center text-sm" role="alert">
					{registerMutation.error.message}
				</p>
			)}

			<Button
				type="submit"
				className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
				disabled={registerMutation.isPending}
				aria-busy={registerMutation.isPending}
			>
				{registerMutation.isPending ? "가입 중..." : "회원가입"}
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
