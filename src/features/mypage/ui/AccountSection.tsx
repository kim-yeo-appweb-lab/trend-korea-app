import { ChevronRight } from "lucide-react";

export function AccountSection() {
	const items = [
		{ label: "회원정보 수정", href: "/mypage/edit" },
		{ label: "비밀번호 변경", href: "#" },
		{ label: "SNS 계정 연동", href: "#" }
	];

	return (
		<div className="bg-surface border-border rounded-lg border p-6">
			<h3 className="text-fg mb-3 text-base font-semibold">계정 관리</h3>
			<div className="divide-border divide-y">
				{items.map((item) => (
					<a
						key={item.label}
						href={item.href}
						className="text-fg-secondary hover:text-fg flex items-center justify-between py-3 text-sm transition-colors"
					>
						{item.label}
						<ChevronRight className="text-fg-muted h-4 w-4" />
					</a>
				))}
			</div>
		</div>
	);
}
