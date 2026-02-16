import "./styles/globals.css";

import type { Metadata, Viewport } from "next";

import { geistMono, geistSans, Providers } from ".";

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

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
