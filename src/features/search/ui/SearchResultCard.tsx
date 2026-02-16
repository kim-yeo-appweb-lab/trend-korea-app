import { Badge } from "@kim-yeo-appweb-lab/ui";

import { type SearchResultItem } from "../model";

type SearchResultCardProps = {
	item: SearchResultItem;
};

const typeLabels: Record<string, string> = {
	event: "사건",
	issue: "이슈",
	post: "게시글"
};

export function SearchResultCard({ item }: SearchResultCardProps) {
	return (
		<div className="border-border border-b py-4 last:border-b-0">
			<div className="flex items-center gap-2">
				<Badge>{typeLabels[item.type]}</Badge>
				<time className="text-fg-muted text-xs">{item.date}</time>
			</div>
			<h3 className="text-fg mt-1.5 text-sm font-semibold">{item.title}</h3>
			<p className="text-fg-muted mt-1 line-clamp-2 text-xs">{item.summary}</p>
			{item.tags.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-1">
					{item.tags.map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
			)}
		</div>
	);
}
