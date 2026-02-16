import { Badge } from "@kim-yeo-appweb-lab/ui";

type TrackingSavedEventCardProps = {
	id: string;
	title: string;
	date: string;
	tags: string[];
};

export function TrackingSavedEventCard({ id: _id, title, date, tags }: TrackingSavedEventCardProps) {
	return (
		<div className="bg-surface border-border hover:border-border-strong rounded-lg border p-6 transition-colors">
			<div className="space-y-2">
				<time className="text-fg-muted text-xs">{date}</time>
				<h3 className="text-fg text-sm font-semibold">{title}</h3>
				<div className="flex flex-wrap gap-1">
					{tags.map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
