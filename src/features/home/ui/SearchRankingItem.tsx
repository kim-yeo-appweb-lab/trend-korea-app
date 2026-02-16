import { type SearchRankingItemData } from "../model";

type SearchRankingItemProps = {
	item: SearchRankingItemData;
};

function ChangeIndicator({ change, changeAmount }: Pick<SearchRankingItemData, "change" | "changeAmount">) {
	switch (change) {
		case "up":
			return <span className="text-rank-up text-xs">▲ {changeAmount}</span>;
		case "down":
			return <span className="text-rank-down text-xs">▼ {changeAmount}</span>;
		case "new":
			return <span className="bg-badge-new-bg text-badge-new rounded px-1 py-0.5 text-xs font-bold">NEW</span>;
		case "steady":
			return <span className="text-rank-neutral text-xs">-</span>;
	}
}

export function SearchRankingItem({ item }: SearchRankingItemProps) {
	return (
		<li className="flex items-center gap-3 py-1.5">
			<span className="text-fg w-5 text-center text-sm font-bold">{item.rank}</span>
			<span className="text-fg-secondary flex-1 truncate text-sm">{item.keyword}</span>
			<ChangeIndicator change={item.change} changeAmount={item.changeAmount} />
		</li>
	);
}
