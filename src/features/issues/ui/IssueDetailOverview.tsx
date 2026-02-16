import { Badge } from "@kim-yeo-appweb-lab/ui";

import { issueStatusBadgeMap } from "../../../shared/utils";
import { type Issue } from "../model";

type IssueDetailOverviewProps = {
	issue: Issue;
};

export function IssueDetailOverview({ issue }: IssueDetailOverviewProps) {
	const statusBadge = issueStatusBadgeMap[issue.status];

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<Badge colorScheme={statusBadge.colorScheme} role="status" aria-label={`상태: ${statusBadge.label}`}>
					{statusBadge.label}
				</Badge>
				<span className="text-fg-muted text-sm">추적자 {issue.trackerCount}명</span>
			</div>
			<h1 className="text-fg text-xl font-bold">{issue.title}</h1>
			<p className="text-fg-secondary text-sm leading-relaxed">{issue.description}</p>
			<div className="flex flex-wrap gap-1.5">
				{issue.tags.map((tag) => (
					<Badge key={tag.id}>{tag.name}</Badge>
				))}
			</div>
		</div>
	);
}
