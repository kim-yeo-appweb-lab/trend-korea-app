export type ApiSuccessResponse<T> = {
	success: true;
	data: T;
	message: string;
	timestamp: string;
};

export type ApiErrorDetail = {
	field: string;
	reason: string;
};

export type ApiErrorResponse = {
	success: false;
	error: {
		code: string;
		message: string;
		details: {
			errors?: ApiErrorDetail[];
			fields?: string[];
		};
	};
	timestamp: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
