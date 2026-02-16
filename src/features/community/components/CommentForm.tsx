"use client";

import { Button, Textarea } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

type CommentFormProps = {
	postId: string;
	parentId?: string;
	placeholder?: string;
};

export function CommentForm({
	postId: _postId,
	parentId: _parentId,
	placeholder = "댓글을 작성하세요..."
}: CommentFormProps) {
	const [content, setContent] = useState("");

	function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setContent(e.target.value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!content.trim()) return;
		// TODO: API 호출
		setContent("");
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<Textarea value={content} onChange={handleContentChange} placeholder={placeholder} size="sm" />
			<div className="flex justify-end">
				<Button type="submit" size="sm" disabled={!content.trim()}>
					등록
				</Button>
			</div>
		</form>
	);
}
