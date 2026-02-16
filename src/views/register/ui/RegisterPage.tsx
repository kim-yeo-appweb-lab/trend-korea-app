"use client";

import { Button } from "@kim-yeo-appweb-lab/ui";
import { useRouter } from "next/navigation";

import { AuthDivider, RegisterForm, SocialLoginButtons } from "../../../features/auth";
import { Logo } from "../../../shared/ui";

export function RegisterPage() {
	const router = useRouter();

	function handleBack() {
		router.push("/");
	}

	return (
		<>
			{/* 뒤로가기 버튼 - 화면 좌측 상단 고정 */}
			<Button
				variant="ghost"
				size="sm"
				onClick={handleBack}
				className="fixed top-6 left-6 gap-2"
				aria-label="홈으로 이동"
			>
				<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				<span className="hidden sm:inline">홈으로</span>
			</Button>

			<div className="space-y-6">
				<div className="flex flex-col items-center text-center">
					<Logo variant="full" size="lg" />
					<p className="text-fg-muted mt-4 text-sm">회원가입하고 이슈를 추적하세요</p>
				</div>
				<div className="bg-surface border-border rounded-lg border p-6">
					<RegisterForm />
					<AuthDivider />
					<SocialLoginButtons />
				</div>
			</div>
		</>
	);
}
