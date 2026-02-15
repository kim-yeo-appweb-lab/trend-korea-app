"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthDivider, RegisterForm, SocialLoginButtons } from "../../../features/auth/components";
import { Card } from "../../../shared/components";

export default function RegisterPage() {
	const router = useRouter();

	function handleBack() {
		router.push("/");
	}

	return (
		<>
			{/* 뒤로가기 버튼 - 화면 좌측 상단 고정 */}
			<button
				type="button"
				onClick={handleBack}
				className="text-fg-secondary hover:bg-hover-bg hover:text-fg fixed top-6 left-6 flex items-center gap-2 rounded-lg p-2 text-sm transition-colors"
			>
				<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				<span className="hidden sm:inline">홈으로</span>
			</button>

			<div className="space-y-6">
				<div className="text-center">
					<Link href="/">
						<h1 className="text-fg hover:text-primary cursor-pointer text-2xl font-bold transition-colors">
							<span className="text-primary">C</span> 트렌드코리아
						</h1>
					</Link>
					<p className="text-fg-muted mt-2 text-sm">회원가입하고 이슈를 추적하세요</p>
				</div>
				<Card className="p-6">
					<RegisterForm />
					<AuthDivider />
					<SocialLoginButtons />
				</Card>
			</div>
		</>
	);
}
