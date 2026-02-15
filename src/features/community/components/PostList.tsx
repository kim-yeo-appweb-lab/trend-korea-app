"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, Pagination, Select, TabList } from "../../../shared/components";
import { type Post, type Tag } from "../../../shared/types";
import { type CommunitySortOption, type CommunityTab } from "../types";
import { PostCard } from "./PostCard";

// Mock 태그
const MOCK_TAGS: Tag[] = [
	{ id: "t1", name: "정치", type: "category", slug: "politics" },
	{ id: "t2", name: "사회", type: "category", slug: "society" },
	{ id: "t3", name: "경제", type: "category", slug: "economy" },
	{ id: "t4", name: "자유", type: "category", slug: "free" },
	{ id: "t5", name: "유머", type: "category", slug: "humor" }
];

// Mock 게시글
const MOCK_POSTS: Post[] = [
	{
		id: "p1",
		authorId: "u1",
		authorNickname: "시민기자",
		authorImage: undefined,
		title: "추경안 통과에 대한 시민 반응 정리",
		content: "오늘 국회에서 추경안이 통과되었습니다...",
		tags: [MOCK_TAGS[0]],
		isAnonymous: false,
		likeCount: 45,
		dislikeCount: 3,
		commentCount: 12,
		createdAt: "2시간 전"
	},
	{
		id: "p2",
		authorId: "u2",
		authorNickname: "경제분석가",
		authorImage: undefined,
		title: "기준금리 동결이 부동산 시장에 미치는 영향",
		content: "한국은행의 기준금리 동결 결정이...",
		tags: [MOCK_TAGS[2]],
		isAnonymous: false,
		likeCount: 89,
		dislikeCount: 5,
		commentCount: 23,
		createdAt: "3시간 전"
	},
	{
		id: "p3",
		authorId: "u3",
		authorNickname: "익명",
		authorImage: undefined,
		title: "대중교통 요금 인상, 정말 불가피한가?",
		content: "서울시의 대중교통 요금 인상 발표에 대해...",
		tags: [MOCK_TAGS[1]],
		isAnonymous: true,
		likeCount: 156,
		dislikeCount: 12,
		commentCount: 67,
		createdAt: "5시간 전"
	},
	{
		id: "p4",
		authorId: "u4",
		authorNickname: "테크러버",
		authorImage: undefined,
		title: "삼성 AI 반도체 투자, 글로벌 경쟁력 확보할 수 있을까",
		content: "삼성전자가 AI 반도체에 10조원 투자를...",
		tags: [MOCK_TAGS[2]],
		isAnonymous: false,
		likeCount: 34,
		dislikeCount: 2,
		commentCount: 8,
		createdAt: "6시간 전"
	},
	{
		id: "p5",
		authorId: "u5",
		authorNickname: "법률전문가",
		authorImage: undefined,
		title: "플랫폼 노동자 판결의 법적 의미와 영향",
		content: "대법원 전원합의체의 이번 판결은...",
		tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
		isAnonymous: false,
		likeCount: 78,
		dislikeCount: 1,
		commentCount: 19,
		createdAt: "8시간 전"
	},
	{
		id: "p6",
		authorId: "u6",
		authorNickname: "날씨요정",
		authorImage: undefined,
		title: "폭설 피해 상황 실시간 정리",
		content: "중부지방 대설 특보가 발령된 후...",
		tags: [MOCK_TAGS[1]],
		isAnonymous: false,
		likeCount: 201,
		dislikeCount: 0,
		commentCount: 45,
		createdAt: "10시간 전"
	},
	{
		id: "p7",
		authorId: "u7",
		authorNickname: "익명",
		authorImage: undefined,
		title: "오늘자 웃긴 뉴스 모음",
		content: "심각한 뉴스만 보다가 가벼운 것도...",
		tags: [MOCK_TAGS[4]],
		isAnonymous: true,
		likeCount: 312,
		dislikeCount: 15,
		commentCount: 89,
		createdAt: "12시간 전"
	},
	{
		id: "p8",
		authorId: "u8",
		authorNickname: "정치관찰자",
		authorImage: undefined,
		title: "이번 주 국회 주요 일정 정리",
		content: "이번 주 국회에서 예정된 주요 일정을...",
		tags: [MOCK_TAGS[0]],
		isAnonymous: false,
		likeCount: 67,
		dislikeCount: 4,
		commentCount: 15,
		createdAt: "1일 전"
	}
];

const TAB_ITEMS = [
	{ value: "latest" as const, label: "최신" },
	{ value: "popular" as const, label: "인기" },
	{ value: "hot" as const, label: "HOT" }
];

const SORT_OPTIONS = [
	{ value: "latest" as const, label: "최신순" },
	{ value: "popular" as const, label: "추천순" },
	{ value: "comments" as const, label: "댓글순" }
];

export function PostList() {
	const [tab, setTab] = useState<CommunityTab>("latest");
	const [sort, setSort] = useState<CommunitySortOption>("latest");
	const [currentPage, setCurrentPage] = useState(1);

	function handleTabChange(value: CommunityTab) {
		setTab(value);
		setCurrentPage(1);
	}

	function handleSortChange(value: CommunitySortOption) {
		setSort(value);
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<TabList items={TAB_ITEMS} value={tab} onChange={handleTabChange} variant="filled" />
				<div className="flex items-center gap-3">
					<Select options={SORT_OPTIONS} value={sort} onChange={handleSortChange} />
					<Button size="sm" asChild>
						<Link href="/community/write">글쓰기</Link>
					</Button>
				</div>
			</div>

			<div className="space-y-4">
				{MOCK_POSTS.map((post) => (
					<a key={post.id} href={`/community/${post.id}`} className="block">
						<PostCard post={post} />
					</a>
				))}
			</div>

			<Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
		</div>
	);
}
