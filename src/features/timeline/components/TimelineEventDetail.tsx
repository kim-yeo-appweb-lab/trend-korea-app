import { Badge, SourceLink } from "../../../shared/components";
import { type Event } from "../../../shared/types";

type TimelineEventDetailProps = {
	event: Event;
};

export function TimelineEventDetail({ event }: TimelineEventDetailProps) {
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center gap-2">
				<Badge variant="importance" importance={event.importance} />
				<time className="text-fg-muted text-xs">{event.occurredAt}</time>
			</div>
			<h2 className="text-fg text-lg font-bold">{event.title}</h2>
			<p className="text-fg-secondary text-sm leading-relaxed">{event.summary}</p>
			<div className="flex flex-wrap gap-1.5">
				{event.tags.map((tag) => (
					<Badge key={tag.id} variant="tag">
						{tag.name}
					</Badge>
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
