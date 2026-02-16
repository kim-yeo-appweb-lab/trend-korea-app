export function ServiceInfoSection() {
	const items = [
		{ label: "서비스 소개", href: "/about" },
		{ label: "이용약관", href: "/terms" },
		{ label: "개인정보처리방침", href: "/privacy" },
		{ label: "문의하기", href: "/contact" }
	];

	return (
		<div className="bg-surface border-border rounded-lg border p-6">
			<h3 className="text-fg mb-3 text-base font-semibold">서비스 정보</h3>
			<div className="divide-border divide-y">
				{items.map((item) => (
					<a
						key={item.label}
						href={item.href}
						className="text-fg-secondary hover:text-fg flex items-center justify-between py-3 text-sm transition-colors"
					>
						{item.label}
						<svg className="text-fg-muted h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</a>
				))}
			</div>
		</div>
	);
}
