"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { apiClient } from "../../../shared/lib/apiClient";
import { type ApiErrorResponse, type ApiSuccessResponse } from "../../../shared/types/api";
import { getErrorMessage, NETWORK_ERROR_MESSAGE } from "./errorMessages";
import { communityQueries, tagQueries } from "./queries";
import {
	type CreateCommentFormValues,
	type CreatePostFormValues,
	type UpdateCommentFormValues,
	type UpdatePostFormValues
} from "./schemas";
import {
	type Comment,
	type CommentLikeResponse,
	type Post,
	type PostDetail,
	type PostListParams,
	type VoteResponse,
	type VoteType
} from "./types";

class CommunityError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "CommunityError";
	}
}

const parseCommunityError = async (error: unknown): Promise<never> => {
	if (error && typeof error === "object" && "response" in error) {
		try {
			const response = (error as { response: Response }).response;
			const body = (await response.json()) as ApiErrorResponse;
			throw new CommunityError(getErrorMessage(body.error.code));
		} catch (e) {
			if (e instanceof CommunityError) throw e;
		}
	}
	throw new CommunityError(NETWORK_ERROR_MESSAGE);
};

// ─── 태그 조회 ──────────────────────────────────

export const useTags = () => {
	return useQuery(tagQueries.list());
};

// ─── 게시글 조회 ────────────────────────────────

export const usePostList = (params: PostListParams = {}) => {
	return useQuery(communityQueries.postList(params));
};

export const usePostDetail = (postId: string) => {
	return useQuery(communityQueries.postDetail(postId));
};

// ─── 게시글 작성/수정/삭제 ──────────────────────

export const useCreatePost = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: CreatePostFormValues) => {
			try {
				const response = await apiClient.post("posts", { json: data }).json<ApiSuccessResponse<Post>>();
				return response.data;
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onSuccess: (post) => {
			queryClient.invalidateQueries({ queryKey: communityQueries.posts() });
			router.push(`/community/${post.id}`);
		}
	});
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async ({ postId, data }: { postId: string; data: UpdatePostFormValues }) => {
			try {
				const response = await apiClient.patch(`posts/${postId}`, { json: data }).json<ApiSuccessResponse<Post>>();
				return response.data;
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: communityQueries.posts() });
			router.push(`/community/${variables.postId}`);
		}
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (postId: string) => {
			try {
				await apiClient.delete(`posts/${postId}`);
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: communityQueries.posts() });
			router.push("/community");
		}
	});
};

// ─── 게시글 추천/비추천 (낙관적 업데이트) ──────

export const useVotePost = (postId: string) => {
	const queryClient = useQueryClient();
	const queryKey = communityQueries.postDetail(postId).queryKey;

	return useMutation({
		mutationFn: async (type: VoteType) => {
			try {
				const response = await apiClient
					.post(`posts/${postId}/like`, { json: { type } })
					.json<ApiSuccessResponse<VoteResponse>>();
				return response.data;
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onMutate: async (type) => {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData<PostDetail>(queryKey);

			if (previous) {
				if (type === "like") {
					const isToggleOff = previous.userLiked;
					queryClient.setQueryData<PostDetail>(queryKey, {
						...previous,
						likeCount: previous.likeCount + (isToggleOff ? -1 : 1),
						userLiked: !isToggleOff
					});
				} else {
					queryClient.setQueryData<PostDetail>(queryKey, {
						...previous,
						dislikeCount: previous.dislikeCount + 1,
						userLiked: false
					});
				}
			}

			return { previous };
		},
		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(queryKey, context.previous);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		}
	});
};

// ─── 댓글 조회 ──────────────────────────────────

export const useComments = (postId: string) => {
	return useQuery(communityQueries.comments(postId));
};

// ─── 댓글 작성/수정/삭제 ────────────────────────

export const useCreateComment = (postId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateCommentFormValues) => {
			try {
				const response = await apiClient
					.post(`posts/${postId}/comments`, { json: data })
					.json<ApiSuccessResponse<Comment>>();
				return response.data;
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: communityQueries.comments(postId).queryKey });
			queryClient.invalidateQueries({ queryKey: communityQueries.postDetail(postId).queryKey });
		}
	});
};

export const useUpdateComment = (postId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ commentId, data }: { commentId: string; data: UpdateCommentFormValues }) => {
			try {
				const response = await apiClient
					.patch(`comments/${commentId}`, { json: data })
					.json<ApiSuccessResponse<Comment>>();
				return response.data;
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: communityQueries.comments(postId).queryKey });
		}
	});
};

export const useDeleteComment = (postId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (commentId: string) => {
			try {
				await apiClient.delete(`comments/${commentId}`);
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: communityQueries.comments(postId).queryKey });
			queryClient.invalidateQueries({ queryKey: communityQueries.postDetail(postId).queryKey });
		}
	});
};

// ─── 댓글 좋아요 토글 (낙관적 업데이트) ────────

export const useLikeComment = (postId: string) => {
	const queryClient = useQueryClient();
	const queryKey = communityQueries.comments(postId).queryKey;

	const updateCommentInTree = (
		comments: Comment[],
		commentId: string,
		updater: (comment: Comment) => Comment
	): Comment[] => {
		return comments.map((comment) => {
			if (comment.id === commentId) return updater(comment);
			if (comment.replies?.length) {
				return { ...comment, replies: updateCommentInTree(comment.replies, commentId, updater) };
			}
			return comment;
		});
	};

	return useMutation({
		mutationFn: async ({ commentId, userLiked }: { commentId: string; userLiked: boolean }) => {
			try {
				if (userLiked) {
					await apiClient.delete(`comments/${commentId}/like`);
					return { commentId, likeCount: 0, userLiked: false };
				}
				const response = await apiClient
					.post(`comments/${commentId}/like`)
					.json<ApiSuccessResponse<CommentLikeResponse>>();
				return response.data;
			} catch (error) {
				return parseCommunityError(error);
			}
		},
		onMutate: async ({ commentId, userLiked }) => {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData<Comment[]>(queryKey);

			if (previous) {
				queryClient.setQueryData<Comment[]>(
					queryKey,
					updateCommentInTree(previous, commentId, (comment) => ({
						...comment,
						likeCount: userLiked ? comment.likeCount - 1 : comment.likeCount + 1,
						userLiked: !userLiked
					}))
				);
			}

			return { previous };
		},
		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(queryKey, context.previous);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		}
	});
};
