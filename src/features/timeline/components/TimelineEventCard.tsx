import { Badge, Card, CardContent } from "../../../shared/components";
import { type Event } from "../../../shared/types";
import { formatTime, importanceBadgeMap } from "../../../shared/utils";

type TimelineEventCardProps = {
	event: Event;
};

export function TimelineEventCard({ event }: TimelineEventCardProps) {
	const time = formatTime(event.occurredAt);
	const impBadge = importanceBadgeMap[event.importance];

	return (
		<Card className="hover:border-border-strong transition-colors">
			<CardContent className="space-y-2">
				<div className="flex items-center gap-2">
					<time className="text-primary text-xs font-medium">{time}</time>
					<Badge colorScheme={impBadge.colorScheme} aria-label={`중요도: ${impBadge.label}`}>
						{impBadge.label}
					</Badge>
				</div>
				<h3 className="text-fg text-sm leading-snug font-semibold">{event.title}</h3>
				<p className="text-fg-muted line-clamp-2 text-xs">{event.summary}</p>
				<div className="flex items-center justify-between pt-1">
					<div className="flex flex-wrap gap-1">
						{event.tags.map((tag) => (
							<Badge key={tag.id}>{tag.name}</Badge>
						))}
					</div>
					<span className="text-fg-muted text-xs">출처 {event.sources.length}건</span>
				</div>
			</CardContent>
		</Card>
	);
}
