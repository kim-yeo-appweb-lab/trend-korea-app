import { Badge, Card, CardContent } from "../../../shared/components";

type TrackingSavedEventCardProps = {
	id: string;
	title: string;
	date: string;
	tags: string[];
};

export function TrackingSavedEventCard({ id: _id, title, date, tags }: TrackingSavedEventCardProps) {
	return (
		<Card className="hover:border-border-strong transition-colors">
			<CardContent className="space-y-2">
				<time className="text-fg-muted text-xs">{date}</time>
				<h3 className="text-fg text-sm font-semibold">{title}</h3>
				<div className="flex flex-wrap gap-1">
					{tags.map((tag) => (
						<Badge key={tag} variant="tag">
							{tag}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
