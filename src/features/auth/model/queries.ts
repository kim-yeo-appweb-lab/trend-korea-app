import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "../../../shared/lib/apiClient";
import { type ApiSuccessResponse } from "../../../shared/types/api";
import { type User } from "./types";

export const authQueries = {
	all: () => ["auth"] as const,

	currentUser: () =>
		queryOptions({
			queryKey: [...authQueries.all(), "currentUser"] as const,
			queryFn: async () => {
				const response = await apiClient.get("auth/me").json<ApiSuccessResponse<User>>();
				return response.data;
			},
			staleTime: 5 * 60 * 1000,
			retry: false
		})
};
