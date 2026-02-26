"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { apiClient } from "../../../shared/lib/apiClient";
import { type ApiErrorResponse, type ApiSuccessResponse } from "../../../shared/types/api";
import { getErrorMessage, NETWORK_ERROR_MESSAGE } from "./errorMessages";
import { authQueries } from "./queries";
import { type LoginFormValues } from "./schemas";
import { type User } from "./types";

class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AuthError";
	}
}

const parseAuthError = async (error: unknown): Promise<never> => {
	if (error && typeof error === "object" && "response" in error) {
		try {
			const response = (error as { response: Response }).response;
			const body = (await response.json()) as ApiErrorResponse;
			throw new AuthError(getErrorMessage(body.error.code));
		} catch (e) {
			if (e instanceof AuthError) throw e;
		}
	}
	throw new AuthError(NETWORK_ERROR_MESSAGE);
};

export const useCurrentUser = () => {
	return useQuery(authQueries.currentUser());
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: LoginFormValues) => {
			try {
				const response = await apiClient.post("auth/login", { json: data }).json<ApiSuccessResponse<{ user: User }>>();
				return response.data.user;
			} catch (error) {
				return parseAuthError(error);
			}
		},
		onSuccess: (user) => {
			queryClient.setQueryData(authQueries.currentUser().queryKey, user);
			router.push("/");
			router.refresh();
		}
	});
};

export const useRegister = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: { nickname: string; email: string; password: string }) => {
			try {
				const response = await apiClient
					.post("auth/register", { json: data })
					.json<ApiSuccessResponse<{ user: User }>>();
				return response.data.user;
			} catch (error) {
				return parseAuthError(error);
			}
		},
		onSuccess: (user) => {
			queryClient.setQueryData(authQueries.currentUser().queryKey, user);
			router.push("/");
			router.refresh();
		}
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async () => {
			try {
				await apiClient.post("auth/logout");
			} catch {
				// 로그아웃 실패해도 클라이언트 상태는 초기화
			}
		},
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: authQueries.all() });
			router.refresh();
		}
	});
};
