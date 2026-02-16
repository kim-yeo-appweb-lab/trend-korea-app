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
			<Button variant="ghost" size="sm" onClick={handleBack} className="fixed top-4 left-4 z-10" aria-label="홈으로">
				<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
				홈으로
			</Button>

			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="w-full max-w-lg space-y-6">
					<div className="text-center">
						<Logo variant="full" size="lg" className="mx-auto mb-4" disableLink />
						<p className="text-fg-muted mt-2 text-sm">회원가입하고 이슈를 추적하세요</p>
					</div>

					<div className="bg-surface border-border rounded-lg border p-8">
						<RegisterForm />
						<AuthDivider />
						<SocialLoginButtons />
					</div>
				</div>
			</div>
		</>
	);
}
