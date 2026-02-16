// 속보 항목
export type BreakingNewsItemData = {
	id: string;
	number: number;
	time: string;
	title: string;
	summary: string;
	tags: string[];
	importance: "low" | "medium" | "high";
};

// 실시간 검색순위 항목
export type SearchRankingItemData = {
	rank: number;
	keyword: string;
	change: "up" | "down" | "new" | "steady";
	changeAmount?: number;
};

// 주요 뉴스 카드
export type FeaturedNewsCardData = {
	id: string;
	author: string;
	authorImage?: string;
	title: string;
	summary: string;
	imageUrl?: string;
	createdAt: string;
};

// 커뮤니티 핫 게시물
export type HotPostItemData = {
	id: string;
	number: number;
	title: string;
	category: string;
	commentCount: number;
	author: string;
	createdAt: string;
	isHot?: boolean;
};

// 트렌드 카드
export type TrendCardData = {
	id: string;
	rank: number;
	title: string;
	changeRate: string;
	tags: string[];
	summary: string;
};

// 커뮤니티 미디어 카드
export type CommunityMediaCardData = {
	id: string;
	title: string;
	imageUrl: string;
	viewCount: number;
	createdAt: string;
};
