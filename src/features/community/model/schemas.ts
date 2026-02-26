import { z } from "zod";

export const createPostSchema = z.object({
	title: z.string().min(1, "제목을 입력해주세요").max(100, "제목은 100자 이하여야 합니다"),
	content: z.string().min(1, "내용을 입력해주세요").max(10000, "내용은 10000자 이하여야 합니다"),
	tagIds: z.array(z.string()).max(3, "태그는 최대 3개까지 선택할 수 있습니다"),
	isAnonymous: z.boolean()
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
	title: z.string().min(1, "제목을 입력해주세요").max(100, "제목은 100자 이하여야 합니다").optional(),
	content: z.string().min(1, "내용을 입력해주세요").max(10000, "내용은 10000자 이하여야 합니다").optional(),
	tagIds: z.array(z.string()).max(3, "태그는 최대 3개까지 선택할 수 있습니다").optional()
});

export type UpdatePostFormValues = z.infer<typeof updatePostSchema>;

export const createCommentSchema = z.object({
	content: z.string().min(1, "댓글을 입력해주세요"),
	parentId: z.string().nullable()
});

export type CreateCommentFormValues = z.infer<typeof createCommentSchema>;

export const updateCommentSchema = z.object({
	content: z.string().min(1, "댓글을 입력해주세요")
});

export type UpdateCommentFormValues = z.infer<typeof updateCommentSchema>;
