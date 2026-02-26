const ERROR_MESSAGES: Record<string, string> = {
	// Auth errors
	E_AUTH_001: "인증 토큰이 없습니다.",
	E_AUTH_002: "인증 토큰이 만료되었습니다.",
	E_AUTH_003: "유효하지 않은 토큰입니다.",
	E_AUTH_004: "이메일 또는 비밀번호가 일치하지 않습니다.",

	// Conflict errors
	E_CONFLICT_001: "이미 가입된 이메일입니다.",
	E_CONFLICT_002: "이미 사용 중인 닉네임입니다.",

	// Validation errors
	E_VALID_001: "필수 필드가 누락되었습니다.",
	E_VALID_002: "입력값 형식이 올바르지 않습니다.",

	// Resource errors
	E_RESOURCE_005: "사용자를 찾을 수 없습니다."
};

const DEFAULT_ERROR_MESSAGE = "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
const NETWORK_ERROR_MESSAGE = "네트워크 연결을 확인해주세요.";

export const getErrorMessage = (code: string): string => {
	return ERROR_MESSAGES[code] ?? DEFAULT_ERROR_MESSAGE;
};

export { DEFAULT_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE };
