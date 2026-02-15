import { formatNumber } from "../../../shared/utils";
import { type CommunityMediaCardData } from "../types";

type CommunityMediaCardProps = {
	item: CommunityMediaCardData;
};

export function CommunityMediaCard({ item }: CommunityMediaCardProps) {
	return (
		<article className="group border-border bg-surface overflow-hidden rounded-xl border">
			<div className="bg-surface-alt aspect-video">
				<div className="text-fg-muted flex h-full w-full items-center justify-center text-sm">IMG</div>
			</div>
			<div className="p-3">
				<h3 className="text-fg-secondary group-hover:text-primary line-clamp-2 text-sm font-medium">{item.title}</h3>
				<div className="text-fg-muted mt-1.5 flex items-center justify-between text-xs">
					<span>조회 {formatNumber(item.viewCount)}</span>
					<time>{item.createdAt}</time>
				</div>
			</div>
		</article>
	);
}
