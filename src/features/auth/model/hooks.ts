"use client";

import { use } from "react";

import { apiClient } from "../../../shared/lib/apiClient";
import { type ApiErrorResponse, type ApiSuccessResponse } from "../../../shared/types/api";
import { AuthContext } from "./AuthContext";
import { getErrorMessage, NETWORK_ERROR_MESSAGE } from "./errorMessages";
import { type LoginFormValues } from "./schemas";
import { type User } from "./types";

export const useAuth = () => {
	const context = use(AuthContext);

	if (context === null) {
		throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
	}

	return context;
};

type AuthActionResult = {
	success: boolean;
	error?: string;
};

export const useAuthActions = () => {
	const { login: setLoginUser, register: setRegisterUser, logout: setLogout } = useAuth();

	const login = async (data: LoginFormValues): Promise<AuthActionResult> => {
		try {
			const response = await apiClient.post("auth/login", { json: data }).json<ApiSuccessResponse<{ user: User }>>();

			setLoginUser(response.data.user);
			return { success: true };
		} catch (error) {
			return handleAuthError(error);
		}
	};

	const register = async (data: { nickname: string; email: string; password: string }): Promise<AuthActionResult> => {
		try {
			const response = await apiClient.post("auth/register", { json: data }).json<ApiSuccessResponse<{ user: User }>>();

			setRegisterUser(response.data.user);
			return { success: true };
		} catch (error) {
			return handleAuthError(error);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			await apiClient.post("auth/logout");
		} catch {
			// 로그아웃 실패해도 클라이언트 상태는 초기화
		}
		setLogout();
	};

	return { login, register, logout };
};

const handleAuthError = async (error: unknown): Promise<AuthActionResult> => {
	if (error instanceof Response || (error && typeof error === "object" && "response" in error)) {
		try {
			const response = (error as { response: Response }).response;
			const body = (await response.json()) as ApiErrorResponse;
			return { success: false, error: getErrorMessage(body.error.code) };
		} catch {
			// JSON 파싱 실패
		}
	}
	return { success: false, error: NETWORK_ERROR_MESSAGE };
};
