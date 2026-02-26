"use client";

import { createContext, type ReactNode, useCallback, useMemo, useState } from "react";

import { type User } from "./types";

type AuthContextValue = {
	user: User | null;
	isAuthenticated: boolean;
	login: (user: User) => void;
	register: (user: User) => void;
	logout: () => void;
	setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
	children: ReactNode;
	initialUser?: User | null;
};

export function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(initialUser);

	const login = useCallback((newUser: User) => {
		setUser(newUser);
	}, []);

	const register = useCallback((newUser: User) => {
		setUser(newUser);
	}, []);

	const logout = useCallback(() => {
		setUser(null);
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			isAuthenticated: user !== null,
			login,
			register,
			logout,
			setUser
		}),
		[user, login, register, logout]
	);

	return <AuthContext value={value}>{children}</AuthContext>;
}
