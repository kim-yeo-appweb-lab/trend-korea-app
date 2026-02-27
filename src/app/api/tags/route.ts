import { NextResponse } from "next/server";

import { networkError } from "../../../shared/lib/apiResponse";
import { fetchBackend } from "../../../shared/lib/fetchBackend";

export const GET = async (request: Request) => {
	try {
		const { searchParams } = new URL(request.url);
		const result = await fetchBackend(`/api/v1/tags?${searchParams}`);

		if (!result.ok) {
			return NextResponse.json(result.data, { status: result.status });
		}

		return NextResponse.json(result.data);
	} catch (error) {
		return networkError(error);
	}
};
