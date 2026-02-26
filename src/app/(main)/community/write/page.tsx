"use client";

import { Breadcrumb } from "@kim-yeo-appweb-lab/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "../../../../features/auth";
import { PostWriteForm } from "../../../../features/community";

export default function Page() {
	const { data: currentUser, isLoading } = useCurrentUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !currentUser) {
			router.push("/login");
		}
	}, [isLoading, currentUser, router]);

	if (isLoading || !currentUser) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-6">
				<div className="text-fg-muted flex items-center justify-center py-12 text-sm">로딩 중...</div>
			</div>
		);
	}

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
