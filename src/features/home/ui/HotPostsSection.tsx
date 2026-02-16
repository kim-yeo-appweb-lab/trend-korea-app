"use client";

import { SectionHeader, TabList } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

import { type HotPostItemData } from "../model";
import { HotPostItem } from "./HotPostItem";

const DUMMY_HOT_POSTS: HotPostItemData[] = [
	{
		id: "1",
		number: 1,
		title: "추경 15조, 과연 효과가 있을까?",
		category: "경제",
		commentCount: 127,
		author: "경제전문가",
		createdAt: "10분 전",
		isHot: true
	},
	{
		id: "2",
		number: 2,
		title: "9호선 연장 개통되면 출퇴근 시간 얼마나 줄어들까",
		category: "사회",
		commentCount: 89,
		author: "서울시민",
		createdAt: "25분 전",
		isHot: true
	},
	{
		id: "3",
		number: 3,
		title: "직장 내 괴롭힘 대법원 판결 정리",
		category: "사법",
		commentCount: 65,
		author: "법률지식인",
		createdAt: "40분 전"
	},
	{
		id: "4",
		number: 4,
		title: "올해 코스피 전망 어떻게 보시나요?",
		category: "경제",
		commentCount: 52,
		author: "주식초보",
		createdAt: "1시간 전"
	},
	{
		id: "5",
		number: 5,
		title: "강원도 산불 현장 상황 공유합니다",
		category: "재난",
		commentCount: 43,
		author: "강원도민",
		createdAt: "1시간 전"
	},
	{
		id: "6",
		number: 6,
		title: "AI 디지털 교과서, 현직 교사의 솔직한 의견",
		category: "문화",
		commentCount: 38,
		author: "초등교사",
		createdAt: "2시간 전"
	},
	{
		id: "7",
		number: 7,
		title: "한미 정상회담 주요 의제 예상 분석",
		category: "외교안보",
		commentCount: 31,
		author: "국제정치학도",
		createdAt: "2시간 전"
	},
	{
		id: "8",
		number: 8,
		title: "부동산 규제 완화 소식 정리",
		category: "경제",
		commentCount: 28,
		author: "부동산전문",
		createdAt: "3시간 전"
	}
];

const TAB_ITEMS = [
	{ value: "최신", label: "최신" },
	{ value: "인기", label: "인기" },
	{ value: "핫", label: "핫" }
] as const;

type TabValue = (typeof TAB_ITEMS)[number]["value"];

export function HotPostsSection() {
	const [activeTab, setActiveTab] = useState<TabValue>("최신");

	function handleTabChange(value: TabValue) {
		setActiveTab(value);
	}

	const leftPosts = DUMMY_HOT_POSTS.slice(0, 4);
	const rightPosts = DUMMY_HOT_POSTS.slice(4, 8);

	return (
		<section>
			<SectionHeader title="커뮤니티 인기글" href="/community">
				<TabList items={[...TAB_ITEMS]} value={activeTab} onChange={handleTabChange} size="sm" />
			</SectionHeader>
			{/* 좌/우 2열 리스트 (Coinness 패턴) */}
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="border-border bg-surface overflow-hidden rounded-xl border">
					<table className="w-full">
						<tbody>
							{leftPosts.map((post) => (
								<HotPostItem key={post.id} item={post} />
							))}
						</tbody>
					</table>
				</div>
				<div className="border-border bg-surface overflow-hidden rounded-xl border">
					<table className="w-full">
						<tbody>
							{rightPosts.map((post) => (
								<HotPostItem key={post.id} item={post} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
