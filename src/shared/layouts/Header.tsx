"use client";

import { cn, ThemeToggle } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "../ui";

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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function isActive(href: string) {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	}

	function handleMenuOpen() {
		setIsMenuOpen(true);
		document.body.style.overflow = "hidden";
	}

	function handleMenuClose() {
		setIsMenuOpen(false);
		document.body.style.overflow = "";
	}

	return (
		<>
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
						<ThemeToggle />
						<Link
							href="/login"
							className="bg-primary text-primary-fg hover:bg-primary-hover hidden rounded-full px-4 py-1.5 text-sm font-medium transition-colors md:inline-flex"
						>
							로그인
						</Link>
						{/* 햄버거 버튼 (모바일) */}
						<button
							type="button"
							onClick={handleMenuOpen}
							aria-label="메뉴 열기"
							aria-expanded={isMenuOpen}
							aria-controls="mobile-menu"
							className="text-fg-secondary hover:text-fg rounded-md p-1.5 transition-colors md:hidden"
						>
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* 모바일 드로어 */}
			{/* 오버레이 */}
			<div
				onClick={handleMenuClose}
				aria-hidden="true"
				className={cn(
					"fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden",
					isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
				)}
			/>

			{/* 드로어 패널 */}
			<div
				id="mobile-menu"
				role="dialog"
				aria-label="사이트 메뉴"
				aria-hidden={!isMenuOpen}
				className={cn(
					"bg-surface fixed top-0 right-0 z-50 flex h-full w-64 flex-col shadow-xl transition-transform duration-300 ease-in-out md:hidden",
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				)}
			>
				{/* 드로어 헤더 */}
				<div className="border-border flex h-14 items-center justify-between border-b px-4">
					<Logo variant="full" size="md" />
					<button
						type="button"
						onClick={handleMenuClose}
						aria-label="메뉴 닫기"
						className="text-fg-secondary hover:text-fg rounded-md p-1.5 transition-colors"
					>
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* 네비게이션 */}
				<nav className="flex flex-col gap-1 p-3">
					{NAV_ITEMS.map((item) => {
						const active = isActive(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={handleMenuClose}
								className={cn(
									"rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
									active ? "bg-primary text-primary-fg" : "text-fg-secondary hover:bg-hover-bg hover:text-fg"
								)}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				{/* 드로어 하단: 로그인 */}
				<div className="border-border mt-auto border-t p-4">
					<Link
						href="/login"
						onClick={handleMenuClose}
						className="bg-primary text-primary-fg hover:bg-primary-hover block rounded-full py-2.5 text-center text-sm font-medium transition-colors"
					>
						로그인
					</Link>
				</div>
			</div>
		</>
	);
}
