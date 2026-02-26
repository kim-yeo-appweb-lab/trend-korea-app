"use client";

import { type Comment } from "../model";
import { CommentItem } from "./CommentItem";

type CommentTreeProps = {
	comments: Comment[];
	postId: string;
	depth?: number;
};

export function CommentTree({ comments, postId, depth = 0 }: CommentTreeProps) {
	if (comments.length === 0 && depth === 0) {
		return <div className="text-fg-muted py-8 text-center text-sm">아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</div>;
	}

	if (comments.length === 0) return null;

	return (
		<div className="divide-border divide-y">
			{comments.map((comment) => (
				<div key={comment.id}>
					<CommentItem comment={comment} postId={postId} depth={depth} />
					{comment.replies && comment.replies.length > 0 && (
						<CommentTree comments={comment.replies} postId={postId} depth={depth + 1} />
					)}
				</div>
			))}
		</div>
	);
}
