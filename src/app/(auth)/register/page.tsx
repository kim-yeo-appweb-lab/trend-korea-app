import { Home } from "lucide-react";
import Link from "next/link";

import { AuthDivider, RegisterForm, SocialLoginButtons } from "../../../features/auth";
import { Logo } from "../../../shared/ui";

export default function Page() {
	return (
		<>
			<Link
				href="/"
				className="text-fg-secondary hover:text-fg fixed top-4 left-4 z-10 flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
				aria-label="홈으로"
			>
				<Home className="h-5 w-5" />
				홈으로
			</Link>

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
