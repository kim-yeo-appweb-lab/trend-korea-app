import { cn } from "../../../shared/utils";

type SocialLinkItemProps = {
	provider: "kakao" | "naver" | "google";
	isLinked: boolean;
};

const providerConfig = {
	kakao: { label: "카카오", bgClass: "bg-[#FEE500]", textClass: "text-[#191919]" },
	naver: { label: "네이버", bgClass: "bg-[#03C75A]", textClass: "text-white" },
	google: { label: "구글", bgClass: "bg-surface-alt", textClass: "text-fg" }
};

export function SocialLinkItem({ provider, isLinked }: SocialLinkItemProps) {
	const config = providerConfig[provider];

	return (
		<div className="flex items-center justify-between py-3">
			<div className="flex items-center gap-3">
				<div
					className={cn(
						"flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
						config.bgClass,
						config.textClass
					)}
				>
					{config.label.charAt(0)}
				</div>
				<span className="text-fg text-sm">{config.label}</span>
			</div>
			<button
				type="button"
				className={cn(
					"rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
					isLinked
						? "bg-surface-alt text-fg-muted hover:bg-hover-bg"
						: "bg-primary text-primary-fg hover:bg-primary-hover"
				)}
			>
				{isLinked ? "연동 해제" : "연동하기"}
			</button>
		</div>
	);
}
