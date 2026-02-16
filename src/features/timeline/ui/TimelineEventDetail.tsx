import { Badge } from "@kim-yeo-appweb-lab/ui";

import { SourceLink } from "../../../shared/ui";
import { type Event } from "../model";
import { importanceBadgeMap } from "../utils/badgeMapping";

type TimelineEventDetailProps = {
	event: Event;
};

export function TimelineEventDetail({ event }: TimelineEventDetailProps) {
	const impBadge = importanceBadgeMap[event.importance];

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center gap-2">
				<Badge colorScheme={impBadge.colorScheme} role="status" aria-label={`중요도: ${impBadge.label}`}>
					{impBadge.label}
				</Badge>
				<time className="text-fg-muted text-xs">{event.occurredAt}</time>
			</div>
			<h2 className="text-fg text-lg font-bold">{event.title}</h2>
			<p className="text-fg-secondary text-sm leading-relaxed">{event.summary}</p>
			<div className="flex flex-wrap gap-1.5">
				{event.tags.map((tag) => (
					<Badge key={tag.id}>{tag.name}</Badge>
				))}
			</div>
			{event.sources.length > 0 && (
				<div className="border-border space-y-2 border-t pt-4">
					<h4 className="text-fg text-sm font-semibold">출처</h4>
					<div className="space-y-1.5">
						{event.sources.map((source) => (
							<SourceLink key={source.url} source={source} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
