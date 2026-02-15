export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

export function getStoredTheme(): Theme | null {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(STORAGE_KEY) as Theme | null;
}

export function setStoredTheme(theme: Theme): void {
	localStorage.setItem(STORAGE_KEY, theme);
}

export function getSystemTheme(): "light" | "dark" {
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getResolvedTheme(theme: Theme): "light" | "dark" {
	return theme === "system" ? getSystemTheme() : theme;
}
