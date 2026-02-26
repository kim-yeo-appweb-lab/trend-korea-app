import { act, renderHook } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { AuthProvider } from "./AuthContext";
import { useAuth } from "./hooks";
import { type User } from "./types";

const mockUser: User = {
	id: "test-id",
	nickname: "테스트",
	email: "test@test.com",
	profileImage: null,
	role: "member",
	socialProviders: [],
	trackedIssueIds: [],
	savedEventIds: [],
	createdAt: "2026-01-01T00:00:00.000Z"
};

const createWrapper = (initialUser: User | null = null) => {
	const Wrapper = ({ children }: { children: ReactNode }) => (
		<AuthProvider initialUser={initialUser}>{children}</AuthProvider>
	);
	Wrapper.displayName = "TestAuthWrapper";
	return Wrapper;
};

describe("AuthContext", () => {
	it("초기 상태는 비로그인이다", () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: createWrapper()
		});
		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
	});

	it("initialUser가 있으면 로그인 상태이다", () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: createWrapper(mockUser)
		});
		expect(result.current.user).toEqual(mockUser);
		expect(result.current.isAuthenticated).toBe(true);
	});

	it("login 호출 시 user가 설정된다", () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: createWrapper()
		});

		act(() => {
			result.current.login(mockUser);
		});

		expect(result.current.user).toEqual(mockUser);
		expect(result.current.isAuthenticated).toBe(true);
	});

	it("logout 호출 시 user가 null이 된다", () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: createWrapper(mockUser)
		});

		act(() => {
			result.current.logout();
		});

		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
	});

	it("AuthProvider 외부에서 useAuth 호출 시 에러가 발생한다", () => {
		expect(() => {
			renderHook(() => useAuth());
		}).toThrow("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
	});
});
