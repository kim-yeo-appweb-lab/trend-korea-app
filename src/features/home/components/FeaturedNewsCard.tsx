import { Avatar } from "../../../shared/components";
import { type FeaturedNewsCardData } from "../types";

type FeaturedNewsCardProps = {
	item: FeaturedNewsCardData;
};

export function FeaturedNewsCard({ item }: FeaturedNewsCardProps) {
	return (
		<article className="border-border-alt flex gap-3 border-b py-3 last:border-b-0">
			<Avatar src={item.authorImage} name={item.author} size="sm" />
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<span className="text-fg text-sm font-medium">{item.author}</span>
					<time className="text-fg-muted text-xs">{item.createdAt}</time>
				</div>
				<h3 className="text-fg-secondary mt-1 text-sm leading-snug font-medium">{item.title}</h3>
				<p className="text-fg-muted mt-1 line-clamp-2 text-xs">{item.summary}</p>
			</div>
			{item.imageUrl && (
				<div className="bg-surface-alt h-16 w-16 shrink-0 overflow-hidden rounded-lg">
					<div className="text-fg-muted flex h-full w-full items-center justify-center text-xs">IMG</div>
				</div>
			)}
		</article>
	);
}
