import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-border bg-surface-alt border-t">
			<div className="mx-auto max-w-7xl px-4 py-8">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<Link href="/" className="text-fg text-sm font-bold">
							<span className="text-primary">C</span> 트렌드코리아
						</Link>
						<p className="text-fg-muted mt-1 text-xs">대한민국 사건/이슈 타임라인 추적 서비스</p>
					</div>
					<nav className="text-fg-muted flex flex-wrap gap-4 text-xs">
						<Link href="/about" className="hover:text-fg-secondary">
							서비스 소개
						</Link>
						<Link href="/terms" className="hover:text-fg-secondary">
							이용약관
						</Link>
						<Link href="/privacy" className="hover:text-fg-secondary">
							개인정보처리방침
						</Link>
						<Link href="/contact" className="hover:text-fg-secondary">
							문의하기
						</Link>
					</nav>
				</div>
				<div className="border-border mt-6 border-t pt-4">
					<p className="text-fg-muted text-xs">&copy; 2026 트렌드코리아. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
