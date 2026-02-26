"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "@kim-yeo-appweb-lab/ui";
import { useForm } from "react-hook-form";

import { createCommentSchema, useCreateComment } from "../model";

type CommentFormValues = {
	content: string;
	parentId: string | null;
};

type CommentFormProps = {
	postId: string;
	parentId?: string;
	placeholder?: string;
	onSuccess?: () => void;
};

export function CommentForm({ postId, parentId, placeholder = "댓글을 작성하세요...", onSuccess }: CommentFormProps) {
	const createComment = useCreateComment(postId);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid }
	} = useForm<CommentFormValues>({
		resolver: zodResolver(createCommentSchema),
		defaultValues: { content: "", parentId: parentId ?? null },
		mode: "onChange"
	});

	const onSubmit = (data: CommentFormValues) => {
		createComment.mutate(data, {
			onSuccess: () => {
				reset();
				onSuccess?.();
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
			<Textarea
				{...register("content")}
				placeholder={placeholder}
				size="sm"
				aria-invalid={!!errors.content}
				aria-describedby={errors.content ? "comment-error" : undefined}
			/>
			{errors.content && (
				<p id="comment-error" className="animate-in fade-in slide-in-from-top-1 text-danger text-xs">
					{errors.content.message}
				</p>
			)}
			{createComment.error && (
				<p className="text-danger text-xs" role="alert">
					{createComment.error.message}
				</p>
			)}
			<div className="flex justify-end">
				<Button
					type="submit"
					size="sm"
					disabled={!isValid || createComment.isPending}
					aria-busy={createComment.isPending}
				>
					{createComment.isPending ? "등록 중..." : "등록"}
				</Button>
			</div>
		</form>
	);
}
