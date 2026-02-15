import { Badge } from "../../../shared/components";
import { type BreakingNewsItemData } from "../types";

type BreakingNewsItemProps = {
	item: BreakingNewsItemData;
};

export function BreakingNewsItem({ item }: BreakingNewsItemProps) {
	const isHighImportance = item.importance === "high";

	return (
		<article
			className={`border-border-alt flex gap-4 border-b px-4 py-4 last:border-b-0 ${
				isHighImportance ? "bg-badge-breaking-bg" : ""
			}`}
		>
			<span className="text-fg-muted shrink-0 pt-0.5 text-sm font-bold">{String(item.number).padStart(2, "0")}</span>
			<time className="text-fg-muted shrink-0 pt-0.5 text-sm">{item.time}</time>
			<div className="min-w-0 flex-1">
				<h3 className="text-fg text-sm leading-snug font-medium">
					{isHighImportance && (
						<Badge colorScheme="amber" className="mr-2 align-text-top">
							긴급
						</Badge>
					)}
					{item.title}
				</h3>
				<p className="text-fg-secondary mt-2 line-clamp-2 text-xs leading-relaxed">{item.summary}</p>
				<div className="mt-2 flex gap-1.5">
					{item.tags.map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
			</div>
		</article>
	);
}
