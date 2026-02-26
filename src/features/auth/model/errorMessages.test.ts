import { describe, expect, it } from "vitest";

import { DEFAULT_ERROR_MESSAGE, getErrorMessage, NETWORK_ERROR_MESSAGE } from "./errorMessages";

describe("getErrorMessage", () => {
	it("알려진 에러 코드에 올바른 메시지를 반환한다", () => {
		expect(getErrorMessage("E_AUTH_001")).toBe("인증 토큰이 없습니다.");
		expect(getErrorMessage("E_AUTH_004")).toBe("이메일 또는 비밀번호가 일치하지 않습니다.");
		expect(getErrorMessage("E_CONFLICT_001")).toBe("이미 가입된 이메일입니다.");
		expect(getErrorMessage("E_CONFLICT_002")).toBe("이미 사용 중인 닉네임입니다.");
		expect(getErrorMessage("E_VALID_001")).toBe("필수 필드가 누락되었습니다.");
		expect(getErrorMessage("E_RESOURCE_005")).toBe("사용자를 찾을 수 없습니다.");
	});

	it("알 수 없는 에러 코드에 기본 메시지를 반환한다", () => {
		expect(getErrorMessage("UNKNOWN_CODE")).toBe(DEFAULT_ERROR_MESSAGE);
		expect(getErrorMessage("")).toBe(DEFAULT_ERROR_MESSAGE);
	});

	it("NETWORK_ERROR_MESSAGE가 올바르게 내보내진다", () => {
		expect(NETWORK_ERROR_MESSAGE).toBe("네트워크 연결을 확인해주세요.");
	});

	it("DEFAULT_ERROR_MESSAGE가 올바르게 내보내진다", () => {
		expect(DEFAULT_ERROR_MESSAGE).toBe("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
	});
});
