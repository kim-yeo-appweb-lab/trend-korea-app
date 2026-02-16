import { SectionHeader } from "@kim-yeo-appweb-lab/ui";

import { type SearchRankingItemData } from "../model";
import { SearchRankingItem } from "./SearchRankingItem";

const DUMMY_SEARCH_RANKINGS: SearchRankingItemData[] = [
	{ rank: 1, keyword: "추경 편성", change: "up", changeAmount: 3 },
	{ rank: 2, keyword: "기준금리", change: "up", changeAmount: 5 },
	{ rank: 3, keyword: "9호선 연장", change: "new" },
	{ rank: 4, keyword: "직장 내 괴롭힘", change: "up", changeAmount: 2 },
	{ rank: 5, keyword: "코스피 3100", change: "up", changeAmount: 8 },
	{ rank: 6, keyword: "강원 산불", change: "down", changeAmount: 2 },
	{ rank: 7, keyword: "한미 정상회담", change: "steady" },
	{ rank: 8, keyword: "AI 디지털 교과서", change: "new" },
	{ rank: 9, keyword: "출산율 통계", change: "down", changeAmount: 3 },
	{ rank: 10, keyword: "반도체 수출", change: "steady" }
];

export function SearchRankingSection() {
	return (
		<section>
			<SectionHeader title="실시간 검색순위">
				<span className="text-fg-muted text-xs">1시간마다 갱신</span>
			</SectionHeader>
			<div className="bg-surface border-border rounded-lg border p-6">
				<ol className="space-y-0.5">
					{DUMMY_SEARCH_RANKINGS.map((item) => (
						<SearchRankingItem key={item.rank} item={item} />
					))}
				</ol>
			</div>
		</section>
	);
}
