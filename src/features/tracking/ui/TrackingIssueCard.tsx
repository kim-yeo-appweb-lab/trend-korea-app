import { Badge, Card } from "@kim-yeo-appweb-lab/ui";

import { issueStatusBadgeMap } from "../../../shared/utils";
import { type IssueStatus } from "../../issues/model";

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
		<Card className="hover:border-border-strong transition-colors">
			<Card.Content className="space-y-2">
				<div className="flex items-center gap-2">
					{isNew && (
						<Badge colorScheme="info" aria-label="새로운 이슈">
							NEW
						</Badge>
					)}
					<Badge colorScheme={statusBadge.colorScheme} role="status" aria-label={`상태: ${statusBadge.label}`}>
						{statusBadge.label}
					</Badge>
				</div>
				<h3 className="text-fg text-sm font-semibold">{title}</h3>
				<p className="text-fg-muted text-xs">{latestUpdate}</p>
			</Card.Content>
		</Card>
	);
}
