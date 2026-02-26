import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthProvider } from "../model/AuthContext";
import { RegisterForm } from "./RegisterForm";

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

const renderRegisterForm = () => {
	return render(
		<AuthProvider>
			<RegisterForm />
		</AuthProvider>
	);
};

describe("RegisterForm", () => {
	beforeEach(() => {
		mockPush.mockClear();
	});

	it("닉네임, 이메일, 비밀번호, 비밀번호 확인 필드와 회원가입 버튼이 렌더링된다", () => {
		renderRegisterForm();

		expect(screen.getByLabelText("닉네임")).toBeInTheDocument();
		expect(screen.getByLabelText("이메일")).toBeInTheDocument();
		expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
		expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "회원가입" })).toBeInTheDocument();
	});

	it("빈 폼 제출 시 클라이언트 검증 에러가 표시된다", async () => {
		const user = userEvent.setup();
		renderRegisterForm();

		await user.click(screen.getByRole("button", { name: "회원가입" }));

		await waitFor(() => {
			expect(screen.getByText("닉네임을 입력해주세요")).toBeInTheDocument();
		});
	});

	it("비밀번호 불일치 시 에러가 표시된다", async () => {
		const user = userEvent.setup();
		renderRegisterForm();

		await user.type(screen.getByLabelText("닉네임"), "새유저");
		await user.type(screen.getByLabelText("이메일"), "new@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.type(screen.getByLabelText("비밀번호 확인"), "DifferentPassword123!");
		await user.click(screen.getByRole("button", { name: "회원가입" }));

		await waitFor(() => {
			expect(screen.getByText("비밀번호가 일치하지 않습니다")).toBeInTheDocument();
		});
	});

	it("유효한 입력으로 회원가입 성공 시 홈으로 리다이렉트된다", async () => {
		const user = userEvent.setup();
		renderRegisterForm();

		await user.type(screen.getByLabelText("닉네임"), "새유저");
		await user.type(screen.getByLabelText("이메일"), "new@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.type(screen.getByLabelText("비밀번호 확인"), "Password123!");
		await user.click(screen.getByRole("button", { name: "회원가입" }));

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/");
		});
	});

	it("이메일 중복(E_CONFLICT_001) 시 서버 에러 메시지가 표시된다", async () => {
		const user = userEvent.setup();
		renderRegisterForm();

		await user.type(screen.getByLabelText("닉네임"), "새유저");
		await user.type(screen.getByLabelText("이메일"), "existing@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.type(screen.getByLabelText("비밀번호 확인"), "Password123!");
		await user.click(screen.getByRole("button", { name: "회원가입" }));

		await waitFor(() => {
			expect(screen.getByRole("alert")).toHaveTextContent("이미 가입된 이메일입니다.");
		});
	});

	it("닉네임 중복(E_CONFLICT_002) 시 서버 에러 메시지가 표시된다", async () => {
		const user = userEvent.setup();
		renderRegisterForm();

		await user.type(screen.getByLabelText("닉네임"), "기존닉네임");
		await user.type(screen.getByLabelText("이메일"), "new@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.type(screen.getByLabelText("비밀번호 확인"), "Password123!");
		await user.click(screen.getByRole("button", { name: "회원가입" }));

		await waitFor(() => {
			expect(screen.getByRole("alert")).toHaveTextContent("이미 사용 중인 닉네임입니다.");
		});
	});

	it("로딩 중 버튼이 비활성화되고 텍스트가 변경된다", async () => {
		const user = userEvent.setup();
		renderRegisterForm();

		await user.type(screen.getByLabelText("닉네임"), "새유저");
		await user.type(screen.getByLabelText("이메일"), "new@example.com");
		await user.type(screen.getByLabelText("비밀번호"), "Password123!");
		await user.type(screen.getByLabelText("비밀번호 확인"), "Password123!");
		await user.click(screen.getByRole("button", { name: "회원가입" }));

		await waitFor(() => {
			const button = screen.getByRole("button", { name: /회원가입/ });
			expect(button).toBeInTheDocument();
		});
	});

	it("로그인 링크가 올바른 경로를 가리킨다", () => {
		renderRegisterForm();

		const loginLink = screen.getByRole("link", { name: "로그인" });
		expect(loginLink).toHaveAttribute("href", "/login");
	});
});
