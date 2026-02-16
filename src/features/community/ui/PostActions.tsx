"use client";

import { Button } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

type PostActionsProps = {
	likeCount: number;
	dislikeCount: number;
};

export function PostActions({ likeCount, dislikeCount }: PostActionsProps) {
	const [likes, setLikes] = useState(likeCount);
	const [dislikes, setDislikes] = useState(dislikeCount);
	const [userAction, setUserAction] = useState<"like" | "dislike" | null>(null);

	function handleLike() {
		if (userAction === "like") {
			setLikes((prev) => prev - 1);
			setUserAction(null);
		} else {
			if (userAction === "dislike") setDislikes((prev) => prev - 1);
			setLikes((prev) => prev + 1);
			setUserAction("like");
		}
	}

	function handleDislike() {
		if (userAction === "dislike") {
			setDislikes((prev) => prev - 1);
			setUserAction(null);
		} else {
			if (userAction === "like") setLikes((prev) => prev - 1);
			setDislikes((prev) => prev + 1);
			setUserAction("dislike");
		}
	}

	return (
		<div className="border-border flex items-center justify-center gap-3 border-y py-4">
			<Button variant={userAction === "like" ? "primary" : "ghost"} size="sm" onClick={handleLike}>
				추천 {likes}
			</Button>
			<Button variant={userAction === "dislike" ? "secondary" : "ghost"} size="sm" onClick={handleDislike}>
				비추천 {dislikes}
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
