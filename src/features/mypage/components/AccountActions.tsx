"use client";

import { Button } from "@kim-yeo-appweb-lab/ui";

export function AccountActions() {
	function handleLogout() {
		// TODO: 로그아웃 API
	}

	function handleWithdraw() {
		// TODO: 탈퇴 확인 모달
	}

	return (
		<div className="space-y-3 pt-4">
			<Button variant="secondary" className="w-full" onClick={handleLogout}>
				로그아웃
			</Button>
			<button
				type="button"
				onClick={handleWithdraw}
				className="text-fg-muted hover:text-danger w-full text-center text-sm transition-colors"
			>
				회원 탈퇴
			</button>
		</div>
	);
}
