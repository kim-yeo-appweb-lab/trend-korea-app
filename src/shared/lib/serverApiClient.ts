import ky, { type KyRequest, type KyResponse, type NormalizedOptions } from "ky";

import { clearAuthCookies, getAccessToken, getRefreshToken, setAuthCookies } from "./cookies";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

const refreshAccessToken = async (): Promise<string | null> => {
	const refreshToken = await getRefreshToken();
	if (!refreshToken) return null;

	try {
		const response = await ky
			.post(`${API_BASE_URL}/api/v1/auth/refresh`, {
				json: { refreshToken }
			})
			.json<{
				success: boolean;
				data: { accessToken: string; expiresIn: number };
			}>();

		if (response.success) {
			await setAuthCookies(response.data.accessToken, refreshToken);
			return response.data.accessToken;
		}
	} catch {
		await clearAuthCookies();
	}

	return null;
};

export const serverApiClient = ky.create({
	prefixUrl: `${API_BASE_URL}/api/v1`,
	headers: {
		"Content-Type": "application/json"
	},
	hooks: {
		beforeRequest: [
			async (request: KyRequest) => {
				const accessToken = await getAccessToken();
				if (accessToken) {
					request.headers.set("Authorization", `Bearer ${accessToken}`);
				}
			}
		],
		afterResponse: [
			async (request: KyRequest, _options: NormalizedOptions, response: KyResponse) => {
				if (response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						request.headers.set("Authorization", `Bearer ${newAccessToken}`);
						return ky(request);
					}
				}
			}
		]
	}
});
