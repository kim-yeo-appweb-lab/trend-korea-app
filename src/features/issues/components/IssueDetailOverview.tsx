import { Badge } from "../../../shared/components";
import { type Issue } from "../../../shared/types";

type IssueDetailOverviewProps = {
	issue: Issue;
};

export function IssueDetailOverview({ issue }: IssueDetailOverviewProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<Badge variant="status" status={issue.status} />
				<span className="text-fg-muted text-sm">추적자 {issue.trackerCount}명</span>
			</div>
			<h1 className="text-fg text-xl font-bold">{issue.title}</h1>
			<p className="text-fg-secondary text-sm leading-relaxed">{issue.description}</p>
			<div className="flex flex-wrap gap-1.5">
				{issue.tags.map((tag) => (
					<Badge key={tag.id} variant="tag">
						{tag.name}
					</Badge>
				))}
			</div>
		</div>
	);
}
