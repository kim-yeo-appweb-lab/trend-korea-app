import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "../../../shared/lib/apiClient";
import { type ApiSuccessResponse } from "../../../shared/types/api";
import { type Tag } from "../../../shared/types/common";
import { type Comment, type PaginatedPosts, type PostDetail, type PostListParams } from "./types";

export const tagQueries = {
	all: () => ["tags"] as const,

	list: () =>
		queryOptions({
			queryKey: tagQueries.all(),
			queryFn: async () => {
				const response = await apiClient.get("tags").json<ApiSuccessResponse<Tag[]>>();
				return response.data;
			},
			staleTime: 5 * 60 * 1000
		})
};

export const communityQueries = {
	all: () => ["community"] as const,

	posts: () => [...communityQueries.all(), "posts"] as const,

	postList: (params: PostListParams = {}) =>
		queryOptions({
			queryKey: [...communityQueries.posts(), "list", params] as const,
			queryFn: async () => {
				const searchParams = new URLSearchParams();
				if (params.cursor) searchParams.set("cursor", params.cursor);
				if (params.limit) searchParams.set("limit", String(params.limit));
				if (params.tab) searchParams.set("tab", params.tab);
				if (params.categories) searchParams.set("categories", params.categories);
				if (params.sortBy) searchParams.set("sortBy", params.sortBy);

				const response = await apiClient.get("posts", { searchParams }).json<ApiSuccessResponse<PaginatedPosts>>();
				return response.data;
			},
			staleTime: 30 * 1000
		}),

	postDetail: (postId: string) =>
		queryOptions({
			queryKey: [...communityQueries.posts(), "detail", postId] as const,
			queryFn: async () => {
				const response = await apiClient.get(`posts/${postId}`).json<ApiSuccessResponse<PostDetail>>();
				return response.data;
			},
			staleTime: 60 * 1000
		}),

	comments: (postId: string) =>
		queryOptions({
			queryKey: [...communityQueries.all(), "comments", postId] as const,
			queryFn: async () => {
				const response = await apiClient.get(`posts/${postId}/comments`).json<ApiSuccessResponse<Comment[]>>();
				return response.data;
			},
			staleTime: 15 * 1000
		})
};
