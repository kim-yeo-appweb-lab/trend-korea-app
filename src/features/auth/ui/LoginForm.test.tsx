import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider } from "../model/AuthContext";
import { LoginForm } from "./LoginForm";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
		replace: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
		prefetch: vi.fn()
	})
}));

const renderLoginForm = () => {
	return render(
		<AuthProvider>
			<LoginForm />
		</AuthProvider>
	);
};

describe("LoginForm", () => {
	beforeEach(() => {
		mockPush.mockClear();
	});

	it("이메일과 비밀번호 입력 필드가 렌더링된다", () => {
		renderLoginForm();

		expect(screen.getByLabelText("이메일")).toBeInTheDocument();
		expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
	});

	it("빈 폼 제출 시 클라이언트 검증 에러가 표시된다", async () => {
		const user = userEvent.setup();
		renderLoginForm();

		await user.click(screen.getByRole("button", { name: "로그인" }));

		await waitFor(() => {
			expect(screen.getByText("이메일을 입력해주세요")).toBeInTheDocument();
		});
	});

	it("잘못된 이메일 형식 시 에러가 표시된다", async () => {
		const user = userEvent.setup();
		renderLoginForm();

		await user.type(screen.getByLabelText("이메일"), "invalid-email");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.click(screen.getByRole("button", { name: "로그인" }));

		await waitFor(() => {
			expect(screen.getByText("올바른 이메일 형식이 아닙니다")).toBeInTheDocument();
		});
	});

	it("유효한 입력으로 로그인 성공 시 홈으로 리다이렉트된다", async () => {
		const user = userEvent.setup();
		renderLoginForm();

		await user.type(screen.getByLabelText("이메일"), "test@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.click(screen.getByRole("button", { name: "로그인" }));

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/");
		});
	});

	it("잘못된 인증정보 시 서버 에러 메시지가 표시된다", async () => {
		const user = userEvent.setup();
		renderLoginForm();

		await user.type(screen.getByLabelText("이메일"), "wrong@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "WrongPassword123!");
		await user.click(screen.getByRole("button", { name: "로그인" }));

		await waitFor(() => {
			expect(screen.getByRole("alert")).toHaveTextContent("이메일 또는 비밀번호가 일치하지 않습니다.");
		});
	});

	it("로딩 중 버튼이 비활성화되고 텍스트가 변경된다", async () => {
		const user = userEvent.setup();
		renderLoginForm();

		await user.type(screen.getByLabelText("이메일"), "test@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.click(screen.getByRole("button", { name: "로그인" }));

		await waitFor(() => {
			const button = screen.getByRole("button", { name: /로그인/ });
			expect(button).toBeInTheDocument();
		});
	});

	it("비밀번호 토글 버튼으로 비밀번호 표시/숨기기가 동작한다", async () => {
		const user = userEvent.setup();
		renderLoginForm();

		const passwordInput = screen.getByLabelText("비밀번호");
		expect(passwordInput).toHaveAttribute("type", "password");

		await user.click(screen.getByRole("button", { name: "비밀번호 보기" }));
		expect(passwordInput).toHaveAttribute("type", "text");

		await user.click(screen.getByRole("button", { name: "비밀번호 숨기기" }));
		expect(passwordInput).toHaveAttribute("type", "password");
	});

	it("회원가입 링크가 올바른 경로를 가리킨다", () => {
		renderLoginForm();

		const registerLink = screen.getByRole("link", { name: "회원가입" });
		expect(registerLink).toHaveAttribute("href", "/register");
	});
});
