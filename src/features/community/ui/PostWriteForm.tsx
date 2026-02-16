"use client";

import { Button, Input, TagInput, Textarea } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { useState } from "react";

export function PostWriteForm() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [isAnonymous, setIsAnonymous] = useState(false);

	function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTitle(e.target.value);
	}

	function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setContent(e.target.value);
	}

	function handleTagsChange(newTags: string[]) {
		setTags(newTags);
	}

	function handleAnonymousChange(e: React.ChangeEvent<HTMLInputElement>) {
		setIsAnonymous(e.target.checked);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!title.trim() || !content.trim()) return;
		// TODO: API 호출
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<label htmlFor="post-title" className="text-fg text-sm font-medium">
					제목
				</label>
				<Input id="post-title" value={title} onChange={handleTitleChange} placeholder="제목을 입력하세요" size="lg" />
			</div>

			<div className="space-y-2">
				<label htmlFor="post-content" className="text-fg text-sm font-medium">
					내용
				</label>
				<Textarea
					id="post-content"
					value={content}
					onChange={handleContentChange}
					placeholder="내용을 입력하세요"
					size="lg"
				/>
			</div>

			<div className="space-y-2">
				<label className="text-fg text-sm font-medium">태그</label>
				<TagInput value={tags} onChange={handleTagsChange} maxTags={5} placeholder="태그 입력 후 Enter (최대 5개)" />
			</div>

			<div className="flex items-center gap-2">
				<input
					id="anonymous"
					type="checkbox"
					checked={isAnonymous}
					onChange={handleAnonymousChange}
					className="border-border text-primary focus:ring-ring h-4 w-4 rounded"
				/>
				<label htmlFor="anonymous" className="text-fg-secondary text-sm">
					익명으로 작성
				</label>
			</div>

			<div className="border-border flex justify-end gap-3 border-t pt-6">
				<Button variant="secondary" type="button" asChild>
					<Link href="/community">취소</Link>
				</Button>
				<Button type="submit" disabled={!title.trim() || !content.trim()}>
					등록
				</Button>
			</div>
		</form>
	);
}
