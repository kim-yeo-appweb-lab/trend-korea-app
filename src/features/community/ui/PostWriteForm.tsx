"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, TagInput, Textarea } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { type CreatePostFormValues, createPostSchema, type PostDetail, useCreatePost, useUpdatePost } from "../model";

type PostWriteFormProps = {
	editPost?: PostDetail;
};

export function PostWriteForm({ editPost }: PostWriteFormProps) {
	const isEditMode = !!editPost;
	const createPost = useCreatePost();
	const updatePost = useUpdatePost();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isValid }
	} = useForm<CreatePostFormValues>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: editPost?.title ?? "",
			content: editPost?.content ?? "",
			tagIds: editPost?.tags.map((t) => t.id) ?? [],
			isAnonymous: editPost?.isAnonymous ?? false
		},
		mode: "onChange"
	});

	const tags = watch("tagIds");
	const isPending = createPost.isPending || updatePost.isPending;
	const error = createPost.error || updatePost.error;

	const handleTagsChange = (newTags: string[]) => {
		setValue("tagIds", newTags, { shouldValidate: true });
	};

	const onSubmit = (data: CreatePostFormValues) => {
		if (isEditMode && editPost) {
			updatePost.mutate({ postId: editPost.id, data });
		} else {
			createPost.mutate(data);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="space-y-2">
				<label htmlFor="post-title" className="text-fg text-sm font-medium">
					제목
				</label>
				<Input
					id="post-title"
					{...register("title")}
					placeholder="제목을 입력하세요"
					size="lg"
					aria-invalid={!!errors.title}
					aria-describedby={errors.title ? "title-error" : undefined}
				/>
				{errors.title && (
					<p id="title-error" className="animate-in fade-in slide-in-from-top-1 text-danger text-xs">
						{errors.title.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label htmlFor="post-content" className="text-fg text-sm font-medium">
					내용
				</label>
				<Textarea
					id="post-content"
					{...register("content")}
					placeholder="내용을 입력하세요"
					size="lg"
					aria-invalid={!!errors.content}
					aria-describedby={errors.content ? "content-error" : undefined}
				/>
				{errors.content && (
					<p id="content-error" className="animate-in fade-in slide-in-from-top-1 text-danger text-xs">
						{errors.content.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label className="text-fg text-sm font-medium">태그</label>
				<TagInput value={tags} onChange={handleTagsChange} maxTags={3} placeholder="태그 입력 후 Enter (최대 3개)" />
				{errors.tagIds && (
					<p className="animate-in fade-in slide-in-from-top-1 text-danger text-xs">{errors.tagIds.message}</p>
				)}
			</div>

			{!isEditMode && (
				<div className="flex items-center gap-2">
					<input
						id="anonymous"
						type="checkbox"
						{...register("isAnonymous")}
						className="border-border text-primary focus:ring-ring h-4 w-4 rounded"
					/>
					<label htmlFor="anonymous" className="text-fg-secondary text-sm">
						익명으로 작성
					</label>
				</div>
			)}

			{error && (
				<p className="animate-in fade-in slide-in-from-top-1 text-danger text-sm" role="alert">
					{error.message}
				</p>
			)}

			<div className="border-border flex justify-end gap-3 border-t pt-6">
				<Button variant="secondary" type="button" asChild>
					<Link href={editPost ? `/community/${editPost.id}` : "/community"}>취소</Link>
				</Button>
				<Button type="submit" disabled={!isValid || isPending} aria-busy={isPending}>
					{isPending ? (isEditMode ? "수정 중..." : "등록 중...") : isEditMode ? "수정" : "등록"}
				</Button>
			</div>
		</form>
	);
}
