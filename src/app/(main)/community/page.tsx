import { SectionHeader } from "@kim-yeo-appweb-lab/ui";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { communityQueries, PostList } from "../../../features/community";
import { QueryProvider } from "../../../shared/lib/QueryProvider";

export default async function Page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(communityQueries.postList({ tab: "latest", limit: 10 }));

	return (
		<div className="mx-auto max-w-7xl px-4 py-6">
			<SectionHeader title="커뮤니티" />
			<p className="text-fg-muted mb-6 text-sm">트렌드에 대한 의견을 나누고 토론하세요.</p>
			<QueryProvider dehydratedState={dehydrate(queryClient)}>
				<PostList />
			</QueryProvider>
		</div>
	);
}
