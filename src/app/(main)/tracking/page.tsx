import { TrackingList } from "../../../features/tracking/components";
import { SectionHeader } from "../../../shared/components";

export default function TrackingPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-6">
			<SectionHeader title="내 추적" />
			<p className="text-fg-muted mb-6 text-sm">추적 중인 이슈와 저장한 사건을 확인하세요.</p>
			<TrackingList />
		</div>
	);
}
