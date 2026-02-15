import Image from "next/image";
import Link from "next/link";

import { cn } from "../utils";

type LogoProps = {
	/**
	 * 로고 표시 모드
	 * - "full": 심볼 + 텍스트 (기본)
	 * - "symbol": 심볼만 표시
	 */
	variant?: "full" | "symbol";
	/**
	 * 로고 크기
	 * - "sm": 작은 크기 (h-6)
	 * - "md": 중간 크기 (h-8, 기본)
	 * - "lg": 큰 크기 (h-10)
	 */
	size?: "sm" | "md" | "lg";
	/**
	 * 링크 비활성화 (기본: 홈으로 이동)
	 */
	disableLink?: boolean;
	/**
	 * 추가 클래스명
	 */
	className?: string;
};

const SIZE_MAP = {
	sm: "h-6",
	md: "h-8",
	lg: "h-10"
};

const TEXT_SIZE_MAP = {
	sm: "text-base",
	md: "text-lg",
	lg: "text-xl"
};

export function Logo({ variant = "full", size = "md", disableLink = false, className }: LogoProps) {
	const content = (
		<div className={cn("flex items-center gap-2", className)}>
			{/* 심볼 이미지 */}
			<div className={cn("relative aspect-square", SIZE_MAP[size])}>
				<Image
					src="/logo/symbol.png"
					alt="트렌드코리아 로고"
					fill
					sizes="(max-width: 768px) 24px, 32px"
					className="object-contain"
					priority
				/>
			</div>

			{/* 텍스트 (variant="full"일 때만) */}
			{variant === "full" && <span className={cn("text-fg font-bold", TEXT_SIZE_MAP[size])}>트렌드코리아</span>}
		</div>
	);

	if (disableLink) {
		return content;
	}

	return (
		<Link href="/" className="transition-opacity hover:opacity-80">
			{content}
		</Link>
	);
}
