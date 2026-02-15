"use client";

import { useState } from "react";

import { Button, Input } from "../../../shared/components";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		// TODO: 로그인 API 호출
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="login-email" className="text-fg text-sm font-medium">
					이메일
				</label>
				<Input
					id="login-email"
					type="email"
					value={email}
					onChange={handleEmailChange}
					placeholder="이메일을 입력하세요"
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="login-password" className="text-fg text-sm font-medium">
					비밀번호
				</label>
				<Input
					id="login-password"
					type="password"
					value={password}
					onChange={handlePasswordChange}
					placeholder="비밀번호를 입력하세요"
				/>
			</div>
			<Button type="submit" className="w-full">
				로그인
			</Button>
			<p className="text-fg-muted text-center text-sm">
				계정이 없으신가요?{" "}
				<a href="/register" className="text-primary hover:text-primary-hover font-medium">
					회원가입
				</a>
			</p>
		</form>
	);
}
