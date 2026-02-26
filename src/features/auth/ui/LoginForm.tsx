"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuthActions } from "../model/hooks";
import { type LoginFormValues, loginSchema } from "../model/schemas";
import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
	const router = useRouter();
	const { login } = useAuthActions();
	const [serverError, setServerError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = async (data: LoginFormValues) => {
		setServerError("");
		const result = await login(data);

		if (result.success) {
			router.push("/");
		} else if (result.error) {
			setServerError(result.error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
			<div className="space-y-2">
				<label htmlFor="login-email" className="text-fg text-sm font-medium">
					이메일
				</label>
				<Input
					id="login-email"
					type="email"
					placeholder="이메일을 입력하세요"
					autoComplete="email"
					className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
					aria-invalid={!!errors.email}
					aria-describedby={errors.email ? "login-email-error" : undefined}
					{...register("email")}
				/>
				{errors.email && (
					<p id="login-email-error" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						{errors.email.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label htmlFor="login-password" className="text-fg text-sm font-medium">
					비밀번호
				</label>
				<PasswordInput
					id="login-password"
					placeholder="비밀번호를 입력하세요"
					autoComplete="current-password"
					aria-invalid={!!errors.password}
					aria-describedby={errors.password ? "login-password-error" : undefined}
					{...register("password")}
				/>
				{errors.password && (
					<p id="login-password-error" className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-xs">
						{errors.password.message}
					</p>
				)}
			</div>

			{serverError && (
				<p className="text-danger-500 animate-in fade-in slide-in-from-top-1 text-center text-sm" role="alert">
					{serverError}
				</p>
			)}

			<Button
				type="submit"
				className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
				disabled={isSubmitting}
				aria-busy={isSubmitting}
			>
				{isSubmitting ? "로그인 중..." : "로그인"}
			</Button>

			<p className="text-fg-muted text-center text-sm">
				계정이 없으신가요?{" "}
				<Link
					href="/register"
					className="text-primary hover:text-primary-hover font-medium transition-colors hover:underline"
				>
					회원가입
				</Link>
			</p>
		</form>
	);
}
