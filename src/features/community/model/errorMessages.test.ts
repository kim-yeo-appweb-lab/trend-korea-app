import { describe, expect, it } from "vitest";

import { DEFAULT_ERROR_MESSAGE, getErrorMessage, NETWORK_ERROR_MESSAGE } from "./errorMessages";

describe("getErrorMessage", () => {
	it("알려진 에러 코드를 한국어 메시지로 변환한다", () => {
		expect(getErrorMessage("E_VALID_001")).toBe("필수 필드가 누락되었습니다.");
		expect(getErrorMessage("E_PERM_001")).toBe("권한이 없습니다.");
		expect(getErrorMessage("E_RESOURCE_003")).toBe("게시글을 찾을 수 없습니다.");
		expect(getErrorMessage("E_RESOURCE_004")).toBe("댓글을 찾을 수 없습니다.");
	});

	it("알 수 없는 에러 코드에 기본 메시지를 반환한다", () => {
		expect(getErrorMessage("E_UNKNOWN_999")).toBe(DEFAULT_ERROR_MESSAGE);
	});

	it("네트워크 에러 메시지 상수가 올바르다", () => {
		expect(NETWORK_ERROR_MESSAGE).toBe("네트워크 연결을 확인해주세요.");
	});
});
