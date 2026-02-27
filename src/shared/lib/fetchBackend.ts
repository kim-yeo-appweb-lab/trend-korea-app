const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

type FetchBackendOptions = Omit<RequestInit, "body"> & {
	body?: unknown;
};

type FetchBackendResult<T> = { ok: true; status: number; data: T } | { ok: false; status: number; data: unknown };

/**
 * 백엔드 API를 호출하고 응답을 안전하게 파싱한다.
 *
 * - JSON 파싱 실패 시 원본 텍스트를 에러에 포함
 * - 네트워크 에러 시 원인 메시지를 포함하여 throw
 */
export const fetchBackend = async <T>(
	path: string,
	options: FetchBackendOptions = {}
): Promise<FetchBackendResult<T>> => {
	const { body, headers, ...rest } = options;

	const response = await fetch(`${API_BASE_URL}${path}`, {
		...rest,
		headers: {
			"Content-Type": "application/json",
			...headers
		},
		...(body !== undefined && { body: JSON.stringify(body) })
	});

	let data: unknown;
	const text = await response.text();

	try {
		data = JSON.parse(text);
	} catch {
		throw new Error(`백엔드가 JSON이 아닌 응답을 반환했습니다 (status: ${response.status}): ${text.slice(0, 200)}`);
	}

	if (!response.ok) {
		return { ok: false, status: response.status, data };
	}

	return { ok: true, status: response.status, data: data as T };
};
