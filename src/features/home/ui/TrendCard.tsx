import { Badge } from "@kim-yeo-appweb-lab/ui";

import { type TrendCardData } from "../model";

type TrendCardProps = {
	item: TrendCardData;
};

export function TrendCard({ item }: TrendCardProps) {
	return (
		<div className="bg-surface border-border flex items-start gap-3 rounded-lg border p-4">
			<span className="bg-badge-breaking-bg text-badge-breaking flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
				{item.rank}
			</span>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<h3 className="text-fg text-sm font-medium">{item.title}</h3>
					<span className="text-rank-up text-xs font-medium">{item.changeRate}</span>
				</div>
				<p className="text-fg-muted mt-2 line-clamp-1 text-xs">{item.summary}</p>
				<div className="mt-2 flex gap-1.5">
					{item.tags.map((tag) => (
						<Badge key={tag}>#{tag}</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
