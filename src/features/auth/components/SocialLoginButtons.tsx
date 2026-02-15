import { cn } from "../../../shared/utils";

const providers = [
	{ id: "kakao", label: "카카오로 시작하기", bgClass: "bg-[#FEE500]", textClass: "text-[#191919]" },
	{ id: "naver", label: "네이버로 시작하기", bgClass: "bg-[#03C75A]", textClass: "text-white" },
	{
		id: "google",
		label: "구글로 시작하기",
		bgClass: "bg-surface-alt border border-border",
		textClass: "text-fg"
	}
];

export function SocialLoginButtons() {
	return (
		<div className="space-y-2">
			{providers.map((provider) => (
				<button
					key={provider.id}
					type="button"
					className={cn(
						"flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-opacity hover:opacity-90",
						provider.bgClass,
						provider.textClass
					)}
				>
					{provider.label}
				</button>
			))}
		</div>
	);
}
