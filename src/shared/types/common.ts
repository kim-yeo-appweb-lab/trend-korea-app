/**
 * 공통 도메인 타입 (여러 feature에서 공통 사용)
 */

export type Tag = {
	id: string;
	name: string;
	type: "category" | "region";
	slug: string;
};

export type Source = {
	url: string;
	title: string;
	publisher: string;
	publishedAt: string;
};
