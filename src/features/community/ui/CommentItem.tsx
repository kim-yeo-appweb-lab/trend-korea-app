"use client";

import { Avatar, Button } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

import { formatDateTime } from "../../../shared/utils/date";
import { type Comment, useDeleteComment, useLikeComment, useUpdateComment } from "../model";
import { CommentForm } from "./CommentForm";

type CommentItemProps = {
	comment: Comment;
	postId: string;
	depth?: number;
};

export function CommentItem({ comment, postId, depth = 0 }: CommentItemProps) {
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(comment.content);

	const likeMutation = useLikeComment(postId);
	const updateMutation = useUpdateComment(postId);
	const deleteMutation = useDeleteComment(postId);

	const handleLike = () => {
		likeMutation.mutate({ commentId: comment.id, userLiked: comment.userLiked ?? false });
	};

	const handleToggleReply = () => {
		setIsReplying((prev) => !prev);
	};

	const handleEdit = () => {
		setIsEditing(true);
		setEditContent(comment.content);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	const handleSaveEdit = () => {
		const trimmed = editContent.trim();
		if (!trimmed) return;

		updateMutation.mutate(
			{ commentId: comment.id, data: { content: trimmed } },
			{ onSuccess: () => setIsEditing(false) }
		);
	};

	const handleDelete = () => {
		if (window.confirm("댓글을 삭제하시겠습니까?")) {
			deleteMutation.mutate(comment.id);
		}
	};

	return (
		<div className={depth > 0 ? "border-border ml-8 border-l-2 pl-4" : ""}>
			<div className="flex gap-3 py-3">
				<Avatar src={null} name={comment.authorNickname} size="sm" />
				<div className="min-w-0 flex-1 space-y-1">
					<div className="flex items-center gap-2">
						<span className="text-fg text-sm font-medium">{comment.authorNickname}</span>
						<time className="text-fg-muted text-xs">{formatDateTime(comment.createdAt)}</time>
					</div>

					{isEditing ? (
						<div className="space-y-2">
							<textarea
								value={editContent}
								onChange={(e) => setEditContent(e.target.value)}
								className="border-border bg-surface text-fg w-full rounded border p-2 text-sm"
								aria-label="댓글 수정"
							/>
							{updateMutation.isError && (
								<p className="text-danger text-xs" role="alert">
									{updateMutation.error.message}
								</p>
							)}
							<div className="flex gap-2">
								<Button size="sm" onClick={handleSaveEdit} disabled={!editContent.trim() || updateMutation.isPending}>
									{updateMutation.isPending ? "저장 중..." : "저장"}
								</Button>
								<Button size="sm" variant="ghost" onClick={handleCancelEdit}>
									취소
								</Button>
							</div>
						</div>
					) : (
						<p className="text-fg-secondary text-sm">{comment.content}</p>
					)}

					<div className="text-fg-muted flex items-center gap-1 text-xs">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleLike}
							className={`hover:text-primary transition-colors ${comment.userLiked ? "text-primary" : ""}`}
							disabled={likeMutation.isPending}
							aria-label={`좋아요 ${comment.likeCount}`}
						>
							좋아요 {comment.likeCount}
						</Button>
						{depth === 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={handleToggleReply}
								className="hover:text-primary transition-colors"
							>
								답글
							</Button>
						)}
						{comment.isAuthor && !isEditing && (
							<>
								<Button variant="ghost" size="sm" onClick={handleEdit} className="hover:text-primary transition-colors">
									수정
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={handleDelete}
									disabled={deleteMutation.isPending}
									className="hover:text-danger transition-colors"
								>
									삭제
								</Button>
							</>
						)}
					</div>

					{isReplying && (
						<div className="mt-2">
							<CommentForm
								postId={postId}
								parentId={comment.id}
								placeholder="답글을 작성하세요..."
								onSuccess={() => setIsReplying(false)}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
