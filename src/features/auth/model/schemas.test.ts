import { describe, expect, it } from "vitest";

import { loginSchema, registerSchema } from "./schemas";

describe("loginSchema", () => {
	it("유효한 입력을 통과시킨다", () => {
		const result = loginSchema.safeParse({
			email: "test@example.com",
			password: "password123"
		});

		expect(result.success).toBe(true);
	});

	it("빈 이메일에 실패한다", () => {
		const result = loginSchema.safeParse({
			email: "",
			password: "password123"
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			const emailErrors = result.error.issues.filter((issue) => issue.path[0] === "email");
			expect(emailErrors.length).toBeGreaterThan(0);
			expect(emailErrors[0].message).toBe("이메일을 입력해주세요");
		}
	});

	it("잘못된 이메일 형식에 실패한다", () => {
		const result = loginSchema.safeParse({
			email: "invalid-email",
			password: "password123"
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			const emailErrors = result.error.issues.filter((issue) => issue.path[0] === "email");
			expect(emailErrors.length).toBeGreaterThan(0);
			expect(emailErrors[0].message).toBe("올바른 이메일 형식이 아닙니다");
		}
	});

	it("짧은 비밀번호(8자 미만)에 실패한다", () => {
		const result = loginSchema.safeParse({
			email: "test@example.com",
			password: "short"
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			const passwordErrors = result.error.issues.filter((issue) => issue.path[0] === "password");
			expect(passwordErrors.length).toBeGreaterThan(0);
			expect(passwordErrors[0].message).toBe("비밀번호는 8자 이상이어야 합니다");
		}
	});

	it("긴 비밀번호(73자)에 실패한다", () => {
		const result = loginSchema.safeParse({
			email: "test@example.com",
			password: "a".repeat(73)
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			const passwordErrors = result.error.issues.filter((issue) => issue.path[0] === "password");
			expect(passwordErrors.length).toBeGreaterThan(0);
			expect(passwordErrors[0].message).toBe("비밀번호는 72자 이하여야 합니다");
		}
	});
});

describe("registerSchema", () => {
	const validInput = {
		nickname: "테스트유저",
		email: "test@example.com",
		password: "password123",
		confirmPassword: "password123"
	};

	it("유효한 입력을 통과시킨다", () => {
		const result = registerSchema.safeParse(validInput);

		expect(result.success).toBe(true);
	});

	it("짧은 닉네임(1자)에 실패한다", () => {
		const result = registerSchema.safeParse({
			...validInput,
			nickname: "가"
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			const nicknameErrors = result.error.issues.filter((issue) => issue.path[0] === "nickname");
			expect(nicknameErrors.length).toBeGreaterThan(0);
			expect(nicknameErrors[0].message).toBe("닉네임은 2자 이상이어야 합니다");
		}
	});

	it("긴 닉네임(21자)에 실패한다", () => {
		const result = registerSchema.safeParse({
			...validInput,
			nickname: "가".repeat(21)
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			const nicknameErrors = result.error.issues.filter((issue) => issue.path[0] === "nickname");
			expect(nicknameErrors.length).toBeGreaterThan(0);
			expect(nicknameErrors[0].message).toBe("닉네임은 20자 이하여야 합니다");
		}
	});

	it("비밀번호 불일치에 실패한다", () => {
		const result = registerSchema.safeParse({
			...validInput,
			confirmPassword: "different123"
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			const confirmErrors = result.error.issues.filter((issue) => issue.path.includes("confirmPassword"));
			expect(confirmErrors.length).toBeGreaterThan(0);
			expect(confirmErrors[0].message).toBe("비밀번호가 일치하지 않습니다");
		}
	});

	it("빈 필드에 실패한다", () => {
		const result = registerSchema.safeParse({
			nickname: "",
			email: "",
			password: "",
			confirmPassword: ""
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
		}
	});
});
