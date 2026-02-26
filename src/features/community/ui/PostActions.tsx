"use client";

import { Button } from "@kim-yeo-appweb-lab/ui";

import { useVotePost, type VoteType } from "../model";

type PostActionsProps = {
	postId: string;
	likeCount: number;
	dislikeCount: number;
	userLiked: boolean;
	isAuthenticated: boolean;
};

export function PostActions({ postId, likeCount, dislikeCount, userLiked, isAuthenticated }: PostActionsProps) {
	const voteMutation = useVotePost(postId);

	const handleVote = (type: VoteType) => {
		voteMutation.mutate(type);
	};

	return (
		<div className="border-border flex items-center justify-center gap-3 border-y py-4">
			<Button
				variant={userLiked ? "primary" : "ghost"}
				size="sm"
				onClick={() => handleVote("like")}
				disabled={!isAuthenticated || voteMutation.isPending}
				aria-label={`추천 ${likeCount}`}
			>
				추천 {likeCount}
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => handleVote("dislike")}
				disabled={!isAuthenticated || voteMutation.isPending}
				aria-label={`비추천 ${dislikeCount}`}
			>
				비추천 {dislikeCount}
			</Button>
			<Button variant="ghost" size="sm">
				공유
			</Button>
			<Button variant="ghost" size="sm">
				신고
			</Button>
		</div>
	);
}
