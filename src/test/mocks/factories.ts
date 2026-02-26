import { type User } from "../../features/auth/model/types";

export const createMockUser = (overrides?: Partial<User>): User => ({
	id: "test-user-id",
	nickname: "테스트유저",
	email: "test@example.com",
	profileImage: null,
	role: "member",
	socialProviders: [],
	trackedIssueIds: [],
	savedEventIds: [],
	createdAt: "2026-01-01T00:00:00.000Z",
	...overrides
});
