import { Badge } from "@kim-yeo-appweb-lab/ui";

import { type Trigger } from "../../../entities/issue";
import { SourceLink } from "../../../shared/ui";
import { formatDateTime } from "../../../shared/utils";

type IssueTriggerItemProps = {
	trigger: Trigger;
};

const triggerTypeLabels: Record<string, string> = {
	article: "기사",
	ruling: "판결",
	announcement: "발표",
	correction: "정정",
	status_change: "상태변경"
};

export function IssueTriggerItem({ trigger }: IssueTriggerItemProps) {
	const time = formatDateTime(trigger.occurredAt);

	return (
		<div className="flex gap-4">
			{/* 타임라인 도트 + 라인 */}
			<div className="flex flex-col items-center">
				<div className="border-primary bg-surface h-3 w-3 rounded-full border-2" />
				<div className="bg-border w-px flex-1" />
			</div>
			{/* 콘텐츠 */}
			<div className="space-y-2 pb-6">
				<div className="flex items-center gap-2">
					<time className="text-fg-muted text-xs">{time}</time>
					<Badge>{triggerTypeLabels[trigger.type] ?? trigger.type}</Badge>
				</div>
				<p className="text-fg-secondary text-sm">{trigger.summary}</p>
				{trigger.sources.length > 0 && (
					<div className="flex flex-wrap gap-3">
						{trigger.sources.map((source) => (
							<SourceLink key={source.url} source={source} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
