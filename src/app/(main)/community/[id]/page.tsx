"use client";

import { Breadcrumb, Button } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useCurrentUser } from "../../../../features/auth";
import {
	CommentForm,
	CommentTree,
	PostActions,
	PostDetail,
	useComments,
	useDeletePost,
	usePostDetail
} from "../../../../features/community";

export default function Page() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const id = params.id;

	const { data: post, isLoading: isPostLoading, isError: isPostError } = usePostDetail(id);
	const { data: comments, isLoading: isCommentsLoading } = useComments(id);
	const { data: currentUser } = useCurrentUser();
	const deletePost = useDeletePost();

	const handleDelete = () => {
		if (window.confirm("게시글을 삭제하시겠습니까?")) {
			deletePost.mutate(id);
		}
	};

	if (isPostLoading) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-6">
				<div className="text-fg-muted flex items-center justify-center py-12 text-sm">게시글을 불러오는 중...</div>
			</div>
		);
	}

	if (isPostError || !post) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-6">
				<div className="text-danger flex flex-col items-center justify-center gap-3 py-12 text-sm">
					<p>게시글을 찾을 수 없습니다.</p>
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
				items={[{ label: "홈", href: "/" }, { label: "커뮤니티", href: "/community" }, { label: post.title }]}
			/>
			<div className="mt-6 space-y-6">
				<PostDetail post={post} />

				{post.isAuthor && (
					<div className="flex justify-end gap-2">
						<Button variant="ghost" size="sm" asChild>
							<Link href={`/community/${id}/edit`}>수정</Link>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleDelete}
							disabled={deletePost.isPending}
							className="hover:text-danger"
						>
							{deletePost.isPending ? "삭제 중..." : "삭제"}
						</Button>
					</div>
				)}

				<PostActions
					postId={id}
					likeCount={post.likeCount}
					dislikeCount={post.dislikeCount}
					userLiked={post.userLiked}
					isAuthenticated={!!currentUser}
				/>

				<div className="space-y-4">
					<h2 className="text-fg text-base font-semibold">댓글 {post.commentCount}개</h2>
					{currentUser && <CommentForm postId={id} />}
					{isCommentsLoading ? (
						<div className="text-fg-muted py-4 text-center text-sm">댓글을 불러오는 중...</div>
					) : (
						<CommentTree comments={comments ?? []} postId={id} />
					)}
				</div>
			</div>
		</div>
	);
}
