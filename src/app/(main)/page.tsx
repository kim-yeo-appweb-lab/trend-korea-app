import {
	BreakingNewsSection,
	CategoryTabs,
	CommunityMediaSection,
	FeaturedNewsSection,
	HotPostsSection,
	SearchRankingSection,
	TrendSection
} from "../../features/home";

export default function Page() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-4">
			<CategoryTabs />

			<div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
				<div className="space-y-8">
					<BreakingNewsSection />
					<FeaturedNewsSection />
				</div>

				<aside className="space-y-6">
					<SearchRankingSection />
				</aside>
			</div>

			<div className="mt-8 space-y-8 pb-8">
				<HotPostsSection />
				<TrendSection />
				<CommunityMediaSection />
			</div>
		</div>
	);
}
