"use client";

import { ThemeProvider } from "@kim-yeo-appweb-lab/ui";
import type { PropsWithChildren } from "react";

type ProvidersProps = PropsWithChildren;

/**
 * 애플리케이션 전역 Providers
 * - ThemeProvider: 다크/라이트 모드 지원
 */
export function Providers({ children }: ProvidersProps) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
