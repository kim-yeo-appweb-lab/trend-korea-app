"use client";

import { Button, Input } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

export function RegisterForm() {
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNickname(e.target.value);
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setConfirmPassword(e.target.value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		// TODO: 회원가입 API 호출
	}

	const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="reg-nickname" className="text-fg text-sm font-medium">
					닉네임
				</label>
				<Input id="reg-nickname" value={nickname} onChange={handleNicknameChange} placeholder="닉네임을 입력하세요" />
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
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="reg-password" className="text-fg text-sm font-medium">
					비밀번호
				</label>
				<Input
					id="reg-password"
					type="password"
					value={password}
					onChange={handlePasswordChange}
					placeholder="비밀번호를 입력하세요"
				/>
			</div>
			<div className="space-y-2">
				<label htmlFor="reg-confirm" className="text-fg text-sm font-medium">
					비밀번호 확인
				</label>
				<Input
					id="reg-confirm"
					type="password"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					placeholder="비밀번호를 다시 입력하세요"
				/>
				{passwordMismatch && <p className="text-danger text-xs">비밀번호가 일치하지 않습니다.</p>}
			</div>
			<Button type="submit" className="w-full" disabled={passwordMismatch}>
				회원가입
			</Button>
			<p className="text-fg-muted text-center text-sm">
				이미 계정이 있으신가요?{" "}
				<a href="/login" className="text-primary hover:text-primary-hover font-medium">
					로그인
				</a>
			</p>
		</form>
	);
}
