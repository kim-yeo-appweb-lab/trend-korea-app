import { SectionHeader } from "@kim-yeo-appweb-lab/ui";

import { IssueList } from "../../../features/issues/components";

export default function IssuesPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-6">
			<SectionHeader title="이슈 추적" />
			<p className="text-fg-muted mb-6 text-sm">대한민국 주요 이슈를 추적하고 최신 업데이트를 확인하세요.</p>
			<IssueList />
		</div>
	);
}
