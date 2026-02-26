import ky from "ky";

export const apiClient = ky.create({
	prefixUrl: "/api",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json"
	}
});
