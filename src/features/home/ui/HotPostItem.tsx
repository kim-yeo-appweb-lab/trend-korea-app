import { Badge } from "@kim-yeo-appweb-lab/ui";

import { type HotPostItemData } from "../model";

type HotPostItemProps = {
	item: HotPostItemData;
};

export function HotPostItem({ item }: HotPostItemProps) {
	return (
		<tr className="border-border-alt hover:bg-hover-bg border-b text-sm last:border-b-0">
			<td className="text-fg-muted py-3 pr-4 pl-4 text-center">{item.number}</td>
			<td className="py-3 pr-4">
				<div className="flex items-center gap-2">
					<Badge className="shrink-0">{item.category}</Badge>
					<span className="text-fg-secondary truncate">{item.title}</span>
					{item.isHot && <span className="text-status-ongoing shrink-0 text-xs font-bold">HOT</span>}
					{item.commentCount > 0 && <span className="text-primary shrink-0 text-xs">[{item.commentCount}]</span>}
				</div>
			</td>
			<td className="text-fg-muted py-3 pr-4 text-right text-xs">{item.author}</td>
			<td className="text-fg-muted py-3 pr-4 text-right text-xs">{item.createdAt}</td>
		</tr>
	);
}
