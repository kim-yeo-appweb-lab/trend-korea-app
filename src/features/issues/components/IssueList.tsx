"use client";

import { Select } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

import { type Issue, type Tag, type Trigger } from "../../../shared/types";
import { type IssueFilterState, type IssueSortOption } from "../types";
import { IssueCard } from "./IssueCard";
import { IssueFilter } from "./IssueFilter";

// Mock 태그
const MOCK_TAGS: Tag[] = [
	{ id: "t1", name: "정치", type: "category", slug: "politics" },
	{ id: "t2", name: "사회", type: "category", slug: "society" },
	{ id: "t3", name: "경제", type: "category", slug: "economy" },
	{ id: "t4", name: "사법", type: "category", slug: "judiciary" },
	{ id: "t5", name: "노동", type: "category", slug: "labor" }
];

// Mock 트리거
const MOCK_TRIGGERS: Trigger[] = [
	{
		id: "tr1",
		issueId: "i1",
		occurredAt: "2026-02-15T10:00:00",
		summary: "국회 본회의에서 추경안 통과",
		type: "announcement",
		sources: [{ url: "#", title: "추경안 통과", publisher: "연합뉴스", publishedAt: "2026-02-15" }]
	},
	{
		id: "tr2",
		issueId: "i1",
		occurredAt: "2026-02-14T14:00:00",
		summary: "야당, 추경안 수정 요구",
		type: "article",
		sources: [{ url: "#", title: "야당 수정 요구", publisher: "한겨레", publishedAt: "2026-02-14" }]
	},
	{
		id: "tr3",
		issueId: "i2",
		occurredAt: "2026-02-15T09:00:00",
		summary: "서울시 대중교통 요금 인상 확정",
		type: "announcement",
		sources: [{ url: "#", title: "요금 인상", publisher: "서울경제", publishedAt: "2026-02-15" }]
	},
	{
		id: "tr4",
		issueId: "i3",
		occurredAt: "2026-02-14T16:00:00",
		summary: "대법원 전원합의체 판결 선고",
		type: "ruling",
		sources: [{ url: "#", title: "대법원 판결", publisher: "법률신문", publishedAt: "2026-02-14" }]
	}
];

// Mock 이슈
const MOCK_ISSUES: Issue[] = [
	{
		id: "i1",
		title: "2026년 추가경정예산안 국회 심의",
		description:
			"정부가 제출한 15조원 규모의 추경안이 국회에서 심의 중입니다. 민생안정과 경제활성화를 위한 재원 마련이 핵심 쟁점입니다.",
		status: "ongoing",
		tags: [MOCK_TAGS[0]],
		triggers: [MOCK_TRIGGERS[0], MOCK_TRIGGERS[1]],
		trackerCount: 1234,
		relatedEventIds: ["e1"],
		sources: [{ url: "#", title: "추경안 심의", publisher: "연합뉴스", publishedAt: "2026-02-15" }]
	},
	{
		id: "i2",
		title: "수도권 대중교통 요금 인상 논란",
		description:
			"서울시를 시작으로 수도권 대중교통 요금 인상이 추진되고 있습니다. 시민단체와 정치권에서 반대 목소리가 높습니다.",
		status: "ongoing",
		tags: [MOCK_TAGS[1]],
		triggers: [MOCK_TRIGGERS[2]],
		trackerCount: 892,
		relatedEventIds: ["e2"],
		sources: [{ url: "#", title: "요금 인상 논란", publisher: "서울경제", publishedAt: "2026-02-15" }]
	},
	{
		id: "i3",
		title: "플랫폼 노동자 권리 보장 대법원 판결",
		description:
			"대법원 전원합의체가 플랫폼 종사자의 근로자성을 인정하는 판결을 내렸습니다. 향후 노동시장에 큰 영향이 예상됩니다.",
		status: "closed",
		tags: [MOCK_TAGS[3], MOCK_TAGS[4]],
		triggers: [MOCK_TRIGGERS[3]],
		trackerCount: 2156,
		relatedEventIds: ["e6"],
		sources: [{ url: "#", title: "대법원 판결", publisher: "법률신문", publishedAt: "2026-02-14" }]
	},
	{
		id: "i4",
		title: "AI 반도체 글로벌 경쟁 심화",
		description: "삼성전자, SK하이닉스 등 국내 반도체 기업들이 AI 반도체 시장에서 글로벌 경쟁을 벌이고 있습니다.",
		status: "ongoing",
		tags: [MOCK_TAGS[2]],
		triggers: [],
		trackerCount: 567,
		relatedEventIds: ["e5"],
		sources: [{ url: "#", title: "AI 반도체 경쟁", publisher: "전자신문", publishedAt: "2026-02-14" }]
	},
	{
		id: "i5",
		title: "기준금리 결정과 경제 전망",
		description: "한국은행 금융통화위원회의 기준금리 결정이 경제 전반에 미치는 영향을 추적합니다.",
		status: "reignited",
		tags: [MOCK_TAGS[2]],
		triggers: [],
		trackerCount: 1890,
		relatedEventIds: ["e3"],
		sources: [{ url: "#", title: "기준금리 결정", publisher: "매일경제", publishedAt: "2026-02-15" }]
	}
];

const SORT_OPTIONS = [
	{ value: "latest" as const, label: "최신순" },
	{ value: "trackers" as const, label: "추적자순" },
	{ value: "importance" as const, label: "중요도순" }
];

export function IssueList() {
	const [filter, setFilter] = useState<IssueFilterState>({
		status: "전체",
		category: "전체",
		period: "all"
	});
	const [sort, setSort] = useState<IssueSortOption>("latest");

	function handleStatusChange(value: string) {
		setFilter((prev) => ({ ...prev, status: value }));
	}

	function handleCategoryChange(value: string) {
		setFilter((prev) => ({ ...prev, category: value }));
	}

	function handlePeriodChange(value: string) {
		setFilter((prev) => ({ ...prev, period: value }));
	}

	function handleSortChange(value: IssueSortOption) {
		setSort(value);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<span className="text-fg-muted text-sm">총 {MOCK_ISSUES.length}건</span>
				<Select options={SORT_OPTIONS} value={sort} onChange={handleSortChange} />
			</div>
			<IssueFilter
				filter={filter}
				onStatusChange={handleStatusChange}
				onCategoryChange={handleCategoryChange}
				onPeriodChange={handlePeriodChange}
			/>
			<div className="grid gap-4 sm:grid-cols-2">
				{MOCK_ISSUES.map((issue) => (
					<a key={issue.id} href={`/issues/${issue.id}`} className="block">
						<IssueCard issue={issue} />
					</a>
				))}
			</div>
		</div>
	);
}
