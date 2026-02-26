/**
 * 인증 도메인 타입
 */

export type SocialProvider = "kakao" | "naver" | "google";

export type User = {
	id: string;
	nickname: string;
	email: string;
	profileImage: string | null;
	role: "guest" | "member" | "admin";
	socialProviders: SocialProvider[];
	trackedIssueIds: string[];
	savedEventIds: string[];
	createdAt: string;
};

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	expiresAt?: string;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type RegisterRequest = {
	nickname: string;
	email: string;
	password: string;
};

export type AuthResponse = {
	user: User;
	tokens: AuthTokens;
};
