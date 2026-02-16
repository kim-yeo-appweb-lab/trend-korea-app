import { SectionHeader } from "@kim-yeo-appweb-lab/ui";

import { PostList } from "../../../features/community";

export default function Page() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-6">
			<SectionHeader title="커뮤니티" />
			<p className="text-fg-muted mb-6 text-sm">트렌드에 대한 의견을 나누고 토론하세요.</p>
			<PostList />
		</div>
	);
}
