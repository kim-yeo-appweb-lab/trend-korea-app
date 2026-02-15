import { Badge, Card, CardContent } from "../../../shared/components";

type TrackingIssueCardProps = {
	id: string;
	title: string;
	status: "ongoing" | "closed" | "reignited" | "unverified";
	latestUpdate: string;
	isNew?: boolean;
};

export function TrackingIssueCard({ id: _id, title, status, latestUpdate, isNew }: TrackingIssueCardProps) {
	return (
		<Card className="hover:border-border-strong transition-colors">
			<CardContent className="space-y-2">
				<div className="flex items-center gap-2">
					{isNew && <Badge variant="new" />}
					<Badge variant="status" status={status} />
				</div>
				<h3 className="text-fg text-sm font-semibold">{title}</h3>
				<p className="text-fg-muted text-xs">{latestUpdate}</p>
			</CardContent>
		</Card>
	);
}
