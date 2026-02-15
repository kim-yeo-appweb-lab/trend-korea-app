import { Badge, Card, CardContent } from "../../../shared/components";
import { type Issue } from "../../../shared/types";

type IssueCardProps = {
	issue: Issue;
};

export function IssueCard({ issue }: IssueCardProps) {
	const latestTrigger = issue.triggers[0];

	return (
		<Card className="hover:border-border-strong transition-colors">
			<CardContent className="space-y-3">
				<div className="flex items-center gap-2">
					<Badge variant="status" status={issue.status} />
					<span className="text-fg-muted text-xs">추적자 {issue.trackerCount}명</span>
				</div>
				<h3 className="text-fg text-sm leading-snug font-semibold">{issue.title}</h3>
				{latestTrigger && <p className="text-fg-muted line-clamp-2 text-xs">최근 업데이트: {latestTrigger.summary}</p>}
				<div className="flex flex-wrap gap-1">
					{issue.tags.map((tag) => (
						<Badge key={tag.id} variant="tag">
							{tag.name}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
