"use client";

import { Button } from "@kim-yeo-appweb-lab/ui";
import { useLayoutEffect, useState } from "react";

import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	/* eslint-disable react-hooks/set-state-in-effect */
	useLayoutEffect(() => {
		setMounted(true);
	}, []);
	/* eslint-enable react-hooks/set-state-in-effect */

	if (!mounted) {
		return (
			<Button variant="ghost" size="sm" disabled aria-label="테마 전환 로딩 중">
				<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			</Button>
		);
	}

	function handleToggle() {
		setTheme(resolvedTheme === "light" ? "dark" : "light");
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={handleToggle}
			aria-label={`현재 ${resolvedTheme === "light" ? "라이트" : "다크"}모드, 클릭하여 전환`}
		>
			{resolvedTheme === "light" ? (
				<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			) : (
				<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			)}
		</Button>
	);
}
