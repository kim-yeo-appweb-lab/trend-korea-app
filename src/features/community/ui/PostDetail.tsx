import { Avatar, Badge } from "@kim-yeo-appweb-lab/ui";

import { formatDateTime } from "../../../shared/utils/date";
import { type PostDetail as PostDetailType } from "../model";

type PostDetailProps = {
	post: PostDetailType;
};

export function PostDetail({ post }: PostDetailProps) {
	return (
		<article className="space-y-4">
			<h1 className="text-fg text-xl font-bold">{post.title}</h1>
			<div className="border-border flex items-center gap-3 border-b pb-4">
				<Avatar src={post.authorImage} name={post.isAnonymous ? "익명" : post.authorNickname} size="md" />
				<div>
					<span className="text-fg text-sm font-medium">{post.isAnonymous ? "익명" : post.authorNickname}</span>
					<time className="text-fg-muted ml-2 text-xs">{formatDateTime(post.createdAt)}</time>
				</div>
			</div>
			<div className="prose prose-sm text-fg-secondary max-w-none leading-relaxed whitespace-pre-wrap">
				{post.content}
			</div>
			<div className="border-border flex flex-wrap gap-1.5 border-t pt-4">
				{post.tags.map((tag) => (
					<Badge key={tag.id}>{tag.name}</Badge>
				))}
			</div>
		</article>
	);
}
