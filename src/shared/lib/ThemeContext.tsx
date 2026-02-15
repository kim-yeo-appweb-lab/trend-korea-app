"use client";

import { createContext, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { getStoredTheme, setStoredTheme, type Theme } from "../utils/theme";

type ThemeContextType = {
	theme: Theme;
	resolvedTheme: "light" | "dark";
	setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
	children: ReactNode;
};

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "system";
	return getStoredTheme() ?? "system";
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(getInitialTheme);
	const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => {
		if (typeof window === "undefined") return "light";
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	});

	// resolvedTheme은 theme과 systemTheme으로부터 계산 (파생 상태)
	const resolvedTheme = useMemo(() => {
		return theme === "system" ? systemTheme : theme;
	}, [theme, systemTheme]);

	// 시스템 테마 변경 감지 (외부 시스템 구독)
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		function handleChange(e: MediaQueryListEvent) {
			setSystemTheme(e.matches ? "dark" : "light");
		}

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	// resolvedTheme 변경 시 DOM 업데이트 (외부 시스템 동기화)
	useEffect(() => {
		function updateTheme() {
			document.documentElement.setAttribute("data-theme", resolvedTheme);
			document.documentElement.style.colorScheme = resolvedTheme;
		}

		// View Transition API 지원 여부 확인
		const doc = document as Document & {
			startViewTransition?: (callback: () => void) => void;
		};

		if (doc.startViewTransition) {
			doc.startViewTransition(updateTheme);
		} else {
			// 폴백: transition 잠깐 비활성화
			document.documentElement.classList.add("theme-transitioning");
			updateTheme();
			setTimeout(() => {
				document.documentElement.classList.remove("theme-transitioning");
			}, 0);
		}
	}, [resolvedTheme]);

	const setTheme = useCallback((newTheme: Theme) => {
		setThemeState(newTheme);
		setStoredTheme(newTheme);
	}, []);

	return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>;
}
