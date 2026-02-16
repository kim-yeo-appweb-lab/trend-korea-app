"use client";

import { Avatar, Button, Input } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

import { SocialLinkItem } from "./SocialLinkItem";

export function ProfileEditForm() {
	const [nickname, setNickname] = useState("시민기자");
	const [email, setEmail] = useState("user@example.com");

	function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNickname(e.target.value);
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		// TODO: API 호출
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			{/* 프로필 이미지 */}
			<div className="flex flex-col items-center gap-3">
				<Avatar src={null} name={nickname} size="lg" />
				<Button variant="ghost" size="sm" type="button">
					이미지 변경
				</Button>
			</div>

			{/* 기본 정보 */}
			<div className="space-y-4">
				<div className="space-y-2">
					<label htmlFor="edit-nickname" className="text-fg text-sm font-medium">
						닉네임
					</label>
					<Input id="edit-nickname" value={nickname} onChange={handleNicknameChange} />
				</div>
				<div className="space-y-2">
					<label htmlFor="edit-email" className="text-fg text-sm font-medium">
						이메일
					</label>
					<Input id="edit-email" type="email" value={email} onChange={handleEmailChange} />
				</div>
			</div>

			{/* SNS 연동 */}
			<div className="space-y-2">
				<h3 className="text-fg text-sm font-medium">SNS 계정 연동</h3>
				<div className="divide-border divide-y">
					<SocialLinkItem provider="kakao" isLinked={true} />
					<SocialLinkItem provider="naver" isLinked={false} />
					<SocialLinkItem provider="google" isLinked={false} />
				</div>
			</div>

			{/* 저장 */}
			<div className="border-border flex justify-end gap-3 border-t pt-6">
				<Button variant="secondary" type="button" asChild>
					<a href="/mypage">취소</a>
				</Button>
				<Button type="submit">저장</Button>
			</div>
		</form>
	);
}
