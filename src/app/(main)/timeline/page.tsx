import { TimelineList } from "../../../features/timeline/components";
import { SectionHeader } from "../../../shared/components";

export default function TimelinePage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-6">
			<SectionHeader title="타임라인" />
			<p className="text-fg-muted mb-6 text-sm">대한민국 주요 사건을 시간순으로 확인하세요.</p>
			<TimelineList />
		</div>
	);
}
