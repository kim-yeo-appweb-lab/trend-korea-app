import { describe, expect, it } from "vitest";

import { createCommentSchema, createPostSchema, updateCommentSchema, updatePostSchema } from "./schemas";

describe("createPostSchema", () => {
	it("유효한 입력을 통과시킨다", () => {
		const result = createPostSchema.safeParse({
			title: "테스트 게시글",
			content: "게시글 내용입니다",
			tagIds: ["tag_1"],
			isAnonymous: false
		});
		expect(result.success).toBe(true);
	});

	it("모든 필드가 포함된 입력을 통과시킨다", () => {
		const result = createPostSchema.safeParse({
			title: "테스트",
			content: "내용",
			tagIds: [],
			isAnonymous: false
		});
		expect(result.success).toBe(true);
	});

	it("빈 제목에 실패한다", () => {
		const result = createPostSchema.safeParse({
			title: "",
			content: "내용",
			tagIds: [],
			isAnonymous: false
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			const titleErrors = result.error.issues.filter((issue) => issue.path[0] === "title");
			expect(titleErrors.length).toBeGreaterThan(0);
			expect(titleErrors.at(0)?.message).toBe("제목을 입력해주세요");
		}
	});

	it("100자 초과 제목에 실패한다", () => {
		const result = createPostSchema.safeParse({
			title: "가".repeat(101),
			content: "내용",
			tagIds: [],
			isAnonymous: false
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			const titleErrors = result.error.issues.filter((issue) => issue.path[0] === "title");
			expect(titleErrors.at(0)?.message).toBe("제목은 100자 이하여야 합니다");
		}
	});

	it("빈 내용에 실패한다", () => {
		const result = createPostSchema.safeParse({
			title: "제목",
			content: "",
			tagIds: [],
			isAnonymous: false
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			const contentErrors = result.error.issues.filter((issue) => issue.path[0] === "content");
			expect(contentErrors.at(0)?.message).toBe("내용을 입력해주세요");
		}
	});

	it("태그 4개 이상이면 실패한다", () => {
		const result = createPostSchema.safeParse({
			title: "제목",
			content: "내용",
			tagIds: ["tag_1", "tag_2", "tag_3", "tag_4"],
			isAnonymous: false
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			const tagErrors = result.error.issues.filter((issue) => issue.path[0] === "tagIds");
			expect(tagErrors.at(0)?.message).toBe("태그는 최대 3개까지 선택할 수 있습니다");
		}
	});
});

describe("updatePostSchema", () => {
	it("부분 수정을 허용한다", () => {
		const result = updatePostSchema.safeParse({ title: "수정된 제목" });
		expect(result.success).toBe(true);
	});

	it("빈 객체를 허용한다", () => {
		const result = updatePostSchema.safeParse({});
		expect(result.success).toBe(true);
	});

	it("제목이 빈 문자열이면 실패한다", () => {
		const result = updatePostSchema.safeParse({ title: "" });
		expect(result.success).toBe(false);
	});
});

describe("createCommentSchema", () => {
	it("유효한 댓글 입력을 통과시킨다", () => {
		const result = createCommentSchema.safeParse({ content: "댓글 내용", parentId: null });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.parentId).toBeNull();
		}
	});

	it("대댓글 parentId를 허용한다", () => {
		const result = createCommentSchema.safeParse({
			content: "대댓글",
			parentId: "comment_1"
		});
		expect(result.success).toBe(true);
	});

	it("빈 내용에 실패한다", () => {
		const result = createCommentSchema.safeParse({ content: "", parentId: null });
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.at(0)?.message).toBe("댓글을 입력해주세요");
		}
	});
});

describe("updateCommentSchema", () => {
	it("유효한 수정 입력을 통과시킨다", () => {
		const result = updateCommentSchema.safeParse({ content: "수정된 댓글" });
		expect(result.success).toBe(true);
	});

	it("빈 내용에 실패한다", () => {
		const result = updateCommentSchema.safeParse({ content: "" });
		expect(result.success).toBe(false);
	});
});
