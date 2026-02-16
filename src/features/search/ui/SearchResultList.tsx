"use client";

import { EmptyState } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

import { type SearchResultItem, type SearchTab } from "../model";
import { RecentSearchList } from "./RecentSearchList";
import { SearchBar } from "./SearchBar";
import { SearchFilter } from "./SearchFilter";
import { SearchResultCard } from "./SearchResultCard";
import { SearchResultTabs } from "./SearchResultTabs";

const MOCK_RESULTS: SearchResultItem[] = [
	{
		id: "r1",
		type: "event",
		title: "국회, 2026년 추경안 본회의 통과",
		summary: "국회 본회의에서 2026년 추가경정예산안이 재적의원 과반 찬성으로 통과되었습니다.",
		date: "2026.02.15",
		tags: ["정치", "서울"]
	},
	{
		id: "r2",
		type: "issue",
		title: "수도권 대중교통 요금 인상 논란",
		summary: "서울시를 시작으로 수도권 대중교통 요금 인상이 추진되고 있습니다.",
		date: "2026.02.15",
		tags: ["사회"]
	},
	{
		id: "r3",
		type: "post",
		title: "추경안 통과에 대한 시민 반응 정리",
		summary: "오늘 국회에서 추경안이 통과되었습니다. 주요 내용을 정리합니다.",
		date: "2026.02.15",
		tags: ["정치"]
	},
	{
		id: "r4",
		type: "event",
		title: "한국은행, 기준금리 동결 결정",
		summary: "한국은행 금융통화위원회가 기준금리를 현행 3.25%로 동결했습니다.",
		date: "2026.02.15",
		tags: ["경제"]
	},
	{
		id: "r5",
		type: "issue",
		title: "AI 반도체 글로벌 경쟁 심화",
		summary: "삼성전자, SK하이닉스 등 국내 반도체 기업들이 AI 반도체 시장에서 경쟁 중입니다.",
		date: "2026.02.14",
		tags: ["경제"]
	}
];

export function SearchResultList() {
	const [hasSearched, setHasSearched] = useState(false);
	const [tab, setTab] = useState<SearchTab>("all");

	function handleSearch(_query: string) {
		setHasSearched(true);
	}

	function handleTabChange(value: SearchTab) {
		setTab(value);
	}

	const counts = {
		all: MOCK_RESULTS.length,
		events: MOCK_RESULTS.filter((r) => r.type === "event").length,
		issues: MOCK_RESULTS.filter((r) => r.type === "issue").length,
		community: MOCK_RESULTS.filter((r) => r.type === "post").length
	};

	const filteredResults =
		tab === "all"
			? MOCK_RESULTS
			: MOCK_RESULTS.filter((r) => {
					if (tab === "events") return r.type === "event";
					if (tab === "issues") return r.type === "issue";
					if (tab === "community") return r.type === "post";
					return true;
				});

	return (
		<div className="space-y-6">
			<SearchBar onSearch={handleSearch} />
			<SearchFilter />

			{!hasSearched ? (
				<RecentSearchList onSearch={handleSearch} />
			) : (
				<>
					<SearchResultTabs value={tab} onChange={handleTabChange} counts={counts} />
					{filteredResults.length > 0 ? (
						<div>
							{filteredResults.map((item) => (
								<SearchResultCard key={item.id} item={item} />
							))}
						</div>
					) : (
						<EmptyState title="검색 결과가 없습니다" description="다른 키워드로 검색해 보세요." />
					)}
				</>
			)}
		</div>
	);
}
