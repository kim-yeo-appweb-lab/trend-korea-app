import { Badge } from "@kim-yeo-appweb-lab/ui";

import { type IssueStatus } from "../../../shared/types";
import { issueStatusBadgeMap } from "../../../shared/utils";

type TrackingIssueCardProps = {
	id: string;
	title: string;
	status: IssueStatus;
	latestUpdate: string;
	isNew?: boolean;
};

export function TrackingIssueCard({ id: _id, title, status, latestUpdate, isNew }: TrackingIssueCardProps) {
	const statusBadge = issueStatusBadgeMap[status];

	return (
		<div className="bg-surface border-border hover:border-border-strong rounded-lg border p-6 transition-colors">
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					{isNew && <Badge colorScheme="blue">NEW</Badge>}
					<Badge colorScheme={statusBadge.colorScheme} role="status" aria-label={`상태: ${statusBadge.label}`}>
						{statusBadge.label}
					</Badge>
				</div>
				<h3 className="text-fg text-sm font-semibold">{title}</h3>
				<p className="text-fg-muted text-xs">{latestUpdate}</p>
			</div>
		</div>
	);
}
