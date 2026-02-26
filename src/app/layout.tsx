import "../shared/styles/globals.css";

import { ThemeProvider } from "@kim-yeo-appweb-lab/ui";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import { AuthProvider, type User } from "../features/auth";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: {
		default: "트렌드코리아 - 대한민국 이슈 추적 플랫폼",
		template: "%s | 트렌드코리아"
	},
	description: "대한민국 사건과 이슈를 타임라인으로 추적하는 시민 참여형 플랫폼",
	keywords: ["트렌드코리아", "이슈추적", "타임라인", "사건", "뉴스", "커뮤니티"],
	authors: [{ name: "트렌드코리아" }],
	creator: "트렌드코리아",
	publisher: "트렌드코리아",
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
	alternates: {
		canonical: "/"
	},
	openGraph: {
		type: "website",
		locale: "ko_KR",
		url: "/",
		title: "트렌드코리아 - 대한민국 이슈 추적 플랫폼",
		description: "대한민국 사건과 이슈를 타임라인으로 추적하는 시민 참여형 플랫폼",
		siteName: "트렌드코리아"
	},
	twitter: {
		card: "summary_large_image",
		title: "트렌드코리아 - 대한민국 이슈 추적 플랫폼",
		description: "대한민국 사건과 이슈를 타임라인으로 추적하는 시민 참여형 플랫폼"
	},
	icons: {
		icon: [{ url: "/icons/icon.png", sizes: "96x96", type: "image/png" }],
		apple: [{ url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" }]
	},
	manifest: "/manifest.json"
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#fafafa" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
	]
};

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

const getInitialUser = async (): Promise<User | null> => {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value;

		if (!accessToken) return null;

		const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
			headers: { Authorization: `Bearer ${accessToken}` },
			cache: "no-store"
		});

		if (!response.ok) return null;

		const data = await response.json();
		return data.data as User;
	} catch {
		return null;
	}
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialUser = await getInitialUser();

	return (
		<html lang="ko" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					<AuthProvider initialUser={initialUser}>{children}</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
