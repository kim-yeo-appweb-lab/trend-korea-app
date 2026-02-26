const ERROR_MESSAGES: Record<string, string> = {
	E_VALID_001: "필수 필드가 누락되었습니다.",
	E_VALID_002: "입력값 형식이 올바르지 않습니다.",

	E_AUTH_001: "로그인이 필요합니다.",
	E_AUTH_002: "인증이 만료되었습니다. 다시 로그인해주세요.",
	E_AUTH_003: "유효하지 않은 인증입니다.",

	E_PERM_001: "권한이 없습니다.",

	E_RESOURCE_003: "게시글을 찾을 수 없습니다.",
	E_RESOURCE_004: "댓글을 찾을 수 없습니다.",

	E_CONFLICT_003: "이미 추천한 게시글입니다.",
	E_CONFLICT_004: "이미 좋아요한 댓글입니다."
};

const DEFAULT_ERROR_MESSAGE = "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
const NETWORK_ERROR_MESSAGE = "네트워크 연결을 확인해주세요.";

export const getErrorMessage = (code: string): string => {
	return ERROR_MESSAGES[code] ?? DEFAULT_ERROR_MESSAGE;
};

export { DEFAULT_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE };
