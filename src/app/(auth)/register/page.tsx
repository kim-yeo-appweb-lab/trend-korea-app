"use client";

import { Button } from "@kim-yeo-appweb-lab/ui";
import { useRouter } from "next/navigation";

import { AuthDivider, RegisterForm, SocialLoginButtons } from "../../../features/auth";
import { Logo } from "../../../shared/ui";

export default function Page() {
	const router = useRouter();

	function handleBack() {
		router.push("/");
	}

	return (
		<>
			<Button variant="ghost" size="sm" onClick={handleBack} className="fixed top-4 left-4 z-10" aria-label="뒤로가기">
				<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				뒤로
			</Button>

			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="w-full max-w-md space-y-6">
					<div className="text-center">
						<Logo variant="full" size="lg" className="mx-auto mb-4" disableLink />
						<h1 className="text-fg text-2xl font-bold">회원가입</h1>
						<p className="text-fg-muted mt-2 text-sm">소셜 계정으로 간편하게 가입하세요</p>
					</div>

					<div className="bg-surface border-border rounded-lg border p-8">
						<SocialLoginButtons />
						<AuthDivider />
						<RegisterForm />
					</div>

					<p className="text-fg-muted text-center text-sm">
						이미 계정이 있으신가요?{" "}
						<a href="/login" className="text-primary font-medium hover:underline">
							로그인
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
