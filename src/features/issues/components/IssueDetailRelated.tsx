import { Card, CardContent } from "../../../shared/components";

type RelatedEvent = {
	id: string;
	title: string;
	occurredAt: string;
};

type IssueDetailRelatedProps = {
	events: RelatedEvent[];
};

export function IssueDetailRelated({ events }: IssueDetailRelatedProps) {
	if (events.length === 0) return null;

	return (
		<div className="space-y-3">
			<h2 className="text-fg text-base font-semibold">관련 사건</h2>
			<div className="space-y-2">
				{events.map((event) => (
					<Card key={event.id} className="p-3">
						<CardContent className="flex items-center justify-between">
							<span className="text-fg text-sm">{event.title}</span>
							<time className="text-fg-muted text-xs">{event.occurredAt}</time>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
