import { Avatar, Badge, Card, CardContent } from "../../../shared/components";
import { type Post } from "../../../shared/types";

type PostCardProps = {
	post: Post;
};

export function PostCard({ post }: PostCardProps) {
	return (
		<Card className="hover:border-border-strong transition-colors">
			<CardContent className="space-y-2">
				<div className="flex items-center gap-2">
					<Avatar src={post.authorImage} name={post.isAnonymous ? "익명" : post.authorNickname} size="sm" />
					<div className="min-w-0 flex-1">
						<span className="text-fg text-sm font-medium">{post.isAnonymous ? "익명" : post.authorNickname}</span>
						<time className="text-fg-muted ml-2 text-xs">{post.createdAt}</time>
					</div>
				</div>
				<h3 className="text-fg line-clamp-2 text-sm leading-snug font-semibold">{post.title}</h3>
				<div className="flex items-center justify-between pt-1">
					<div className="flex flex-wrap gap-1">
						{post.tags.slice(0, 3).map((tag) => (
							<Badge key={tag.id} variant="tag">
								{tag.name}
							</Badge>
						))}
					</div>
					<div className="text-fg-muted flex items-center gap-3 text-xs">
						<span>추천 {post.likeCount}</span>
						<span>댓글 {post.commentCount}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
