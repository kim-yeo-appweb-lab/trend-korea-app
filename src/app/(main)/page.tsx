import {
	BreakingNewsSection,
	CategoryTabs,
	CommunityMediaSection,
	FeaturedNewsSection,
	HotPostsSection,
	SearchRankingSection,
	TrendSection
} from "../../features/home/components";

export default function HomePage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-4">
			{/* 카테고리 탭 */}
			<CategoryTabs />

			{/* 메인 콘텐츠 + 사이드바 (Coinness 패턴: ~70% + ~30%) */}
			<div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
				{/* 좌측 메인 콘텐츠 */}
				<div className="space-y-8">
					<BreakingNewsSection />
					<FeaturedNewsSection />
				</div>

				{/* 우측 사이드바 */}
				<aside className="space-y-6">
					<SearchRankingSection />
				</aside>
			</div>

			{/* 전체 폭 섹션들 */}
			<div className="mt-8 space-y-8 pb-8">
				<HotPostsSection />
				<TrendSection />
				<CommunityMediaSection />
			</div>
		</div>
	);
}
