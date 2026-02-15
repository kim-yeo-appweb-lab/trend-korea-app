"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo, ThemeToggle } from "../shared/components";
import { cn } from "../shared/utils";

const NAV_ITEMS = [
	{ label: "홈", href: "/" },
	{ label: "타임라인", href: "/timeline" },
	{ label: "이슈추적", href: "/issues" },
	{ label: "커뮤니티", href: "/community" },
	{ label: "검색", href: "/search" },
	{ label: "내 추적", href: "/tracking" }
] as const;

export function Header() {
	const pathname = usePathname();

	function isActive(href: string) {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	}

	return (
		<header className="border-border bg-surface/80 sticky top-0 z-50 border-b backdrop-blur-sm">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
				{/* 로고 */}
				<div className="flex items-center gap-6">
					<Logo variant="full" size="md" />

					{/* 네비게이션 (데스크탑) */}
					<nav className="hidden items-center gap-1 md:flex">
						{NAV_ITEMS.map((item) => {
							const active = isActive(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
										active ? "bg-primary text-primary-fg" : "text-fg-secondary hover:bg-hover-bg hover:text-fg"
									)}
								>
									{item.label}
								</Link>
							);
						})}
					</nav>
				</div>

				{/* 검색바 */}
				<div className="hidden max-w-md flex-1 px-8 lg:block">
					<div className="relative">
						<input
							type="search"
							placeholder="주요 이슈를 검색하세요"
							className="border-border bg-surface-alt text-fg placeholder:text-fg-muted focus:border-ring focus:bg-surface w-full rounded-full border py-2 pr-4 pl-10 text-sm transition-colors outline-none"
						/>
						<svg
							className="text-fg-muted absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>

				{/* 유저 영역 */}
				<div className="flex items-center gap-3">
					<button
						type="button"
						className="text-fg-muted hover:bg-hover-bg rounded-md p-2 transition-colors lg:hidden"
						aria-label="검색"
					>
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<ThemeToggle />
					<Link
						href="/login"
						className="bg-primary text-primary-fg hover:bg-primary-hover rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
					>
						로그인
					</Link>
				</div>
			</div>
		</header>
	);
}
