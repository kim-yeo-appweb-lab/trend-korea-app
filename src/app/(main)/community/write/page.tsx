import { Breadcrumb } from "@kim-yeo-appweb-lab/ui";

import { PostWriteForm } from "../../../../features/community";

export default function Page() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-6">
			<Breadcrumb
				items={[{ label: "홈", href: "/" }, { label: "커뮤니티", href: "/community" }, { label: "글쓰기" }]}
			/>
			<div className="mt-6">
				<h1 className="text-fg text-xl font-bold">새 글 작성</h1>
				<div className="bg-surface border-border mt-4 rounded-lg border p-6">
					<PostWriteForm />
				</div>
			</div>
		</div>
	);
}
