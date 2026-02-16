/**
 * 인증 도메인 타입
 */

export type AuthProvider = "kakao" | "naver" | "google";

export type User = {
	id: string;
	nickname: string;
	email: string;
	profileImage: string | null;
	role: "guest" | "member" | "admin";
	socialProviders: AuthProvider[];
	trackedIssueIds: string[];
	savedEventIds: string[];
	createdAt: string;
};
