import { type Trigger } from "../model";
import { IssueTriggerItem } from "./IssueTriggerItem";

type IssueDetailTimelineProps = {
	triggers: Trigger[];
};

export function IssueDetailTimeline({ triggers }: IssueDetailTimelineProps) {
	return (
		<div className="space-y-2">
			<h2 className="text-fg text-base font-semibold">업데이트 타임라인</h2>
			<div className="mt-4">
				{triggers.map((trigger) => (
					<IssueTriggerItem key={trigger.id} trigger={trigger} />
				))}
			</div>
		</div>
	);
}
