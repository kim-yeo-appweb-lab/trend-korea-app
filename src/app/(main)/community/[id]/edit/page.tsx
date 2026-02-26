"use client";

import { Breadcrumb, Button } from "@kim-yeo-appweb-lab/ui";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "../../../../../features/auth";
import { PostWriteForm, usePostDetail } from "../../../../../features/community";

export default function Page() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const id = params.id;

	const { data: post, isLoading: isPostLoading } = usePostDetail(id);
	const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

	useEffect(() => {
		if (!isUserLoading && !currentUser) {
			router.push("/login");
		}
	}, [isUserLoading, currentUser, router]);

	if (isPostLoading || isUserLoading || !currentUser) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-6">
				<div className="text-fg-muted flex items-center justify-center py-12 text-sm">로딩 중...</div>
			</div>
		);
	}

	if (!post || !post.isAuthor) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-6">
				<div className="text-danger flex flex-col items-center justify-center gap-3 py-12 text-sm">
					<p>수정 권한이 없습니다.</p>
					<Button variant="secondary" size="sm" onClick={() => router.push("/community")}>
						목록으로 돌아가기
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-6">
			<Breadcrumb
				items={[
					{ label: "홈", href: "/" },
					{ label: "커뮤니티", href: "/community" },
					{ label: post.title, href: `/community/${id}` },
					{ label: "수정" }
				]}
			/>
			<div className="mt-6">
				<h1 className="text-fg text-xl font-bold">글 수정</h1>
				<div className="bg-surface border-border mt-4 rounded-lg border p-6">
					<PostWriteForm editPost={post} />
				</div>
			</div>
		</div>
	);
}
