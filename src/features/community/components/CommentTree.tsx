import { type Comment } from "../../../shared/types";
import { CommentItem } from "./CommentItem";

type CommentTreeProps = {
	comments: Comment[];
	depth?: number;
};

export function CommentTree({ comments, depth = 0 }: CommentTreeProps) {
	return (
		<div className="divide-border divide-y">
			{comments.map((comment) => (
				<div key={comment.id}>
					<CommentItem comment={comment} depth={depth} />
					{comment.replies && comment.replies.length > 0 && (
						<CommentTree comments={comment.replies} depth={depth + 1} />
					)}
				</div>
			))}
		</div>
	);
}
