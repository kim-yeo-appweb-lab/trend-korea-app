import { Badge } from "@kim-yeo-appweb-lab/ui";

import { issueStatusBadgeMap } from "../../../shared/utils";
import { type Issue } from "../model";

type IssueCardProps = {
	issue: Issue;
};

export function IssueCard({ issue }: IssueCardProps) {
	const latestTrigger = issue.triggers[0];
	const statusBadge = issueStatusBadgeMap[issue.status];

	return (
		<div className="bg-surface border-border hover:border-border-strong rounded-lg border p-6 transition-colors">
			<div className="space-y-3">
				<div className="flex items-center gap-2">
					<Badge colorScheme={statusBadge.colorScheme} role="status" aria-label={`상태: ${statusBadge.label}`}>
						{statusBadge.label}
					</Badge>
					<span className="text-fg-muted text-xs">추적자 {issue.trackerCount}명</span>
				</div>
				<h3 className="text-fg text-sm leading-snug font-semibold">{issue.title}</h3>
				{latestTrigger && <p className="text-fg-muted line-clamp-2 text-xs">최근 업데이트: {latestTrigger.summary}</p>}
				<div className="flex flex-wrap gap-1">
					{issue.tags.map((tag) => (
						<Badge key={tag.id}>{tag.name}</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
