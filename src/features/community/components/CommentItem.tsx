import { Avatar } from "@kim-yeo-appweb-lab/ui";

import { type Comment } from "../../../shared/types";

type CommentItemProps = {
	comment: Comment;
	depth?: number;
};

export function CommentItem({ comment, depth = 0 }: CommentItemProps) {
	return (
		<div className={depth > 0 ? "border-border ml-8 border-l-2 pl-4" : ""}>
			<div className="flex gap-3 py-3">
				<Avatar src={null} name={comment.authorNickname} size="sm" />
				<div className="min-w-0 flex-1 space-y-1">
					<div className="flex items-center gap-2">
						<span className="text-fg text-sm font-medium">{comment.authorNickname}</span>
						<time className="text-fg-muted text-xs">{comment.createdAt}</time>
					</div>
					<p className="text-fg-secondary text-sm">{comment.content}</p>
					<div className="text-fg-muted flex items-center gap-3 text-xs">
						<button type="button" className="hover:text-primary transition-colors">
							좋아요 {comment.likeCount}
						</button>
						<button type="button" className="hover:text-primary transition-colors">
							답글
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
