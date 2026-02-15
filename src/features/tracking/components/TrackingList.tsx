"use client";

import { useState } from "react";

import { EmptyState, Select, TabList } from "../../../shared/components";
import { type TrackingSortOption, type TrackingTab } from "../types";
import { TrackingIssueCard } from "./TrackingIssueCard";
import { TrackingSavedEventCard } from "./TrackingSavedEventCard";

const TAB_ITEMS = [
	{ value: "issues" as const, label: "추적 이슈" },
	{ value: "events" as const, label: "저장 사건" }
];

const SORT_OPTIONS = [
	{ value: "latest" as const, label: "최신순" },
	{ value: "updated" as const, label: "업데이트순" }
];

const MOCK_TRACKED_ISSUES = [
	{
		id: "i1",
		title: "2026년 추가경정예산안 국회 심의",
		status: "ongoing" as const,
		latestUpdate: "2시간 전 업데이트",
		isNew: true
	},
	{
		id: "i2",
		title: "수도권 대중교통 요금 인상 논란",
		status: "ongoing" as const,
		latestUpdate: "5시간 전 업데이트",
		isNew: true
	},
	{
		id: "i3",
		title: "플랫폼 노동자 권리 보장 대법원 판결",
		status: "closed" as const,
		latestUpdate: "1일 전 업데이트",
		isNew: false
	},
	{
		id: "i5",
		title: "기준금리 결정과 경제 전망",
		status: "reignited" as const,
		latestUpdate: "3시간 전 업데이트",
		isNew: true
	}
];

const MOCK_SAVED_EVENTS = [
	{ id: "e1", title: "국회, 2026년 추경안 본회의 통과", date: "2026.02.15", tags: ["정치", "서울"] },
	{ id: "e3", title: "한국은행, 기준금리 동결 결정", date: "2026.02.15", tags: ["경제"] },
	{ id: "e4", title: "전국 대설 특보 발령", date: "2026.02.14", tags: ["재난"] }
];

export function TrackingList() {
	const [tab, setTab] = useState<TrackingTab>("issues");
	const [sort, setSort] = useState<TrackingSortOption>("latest");

	function handleTabChange(value: TrackingTab) {
		setTab(value);
	}

	function handleSortChange(value: TrackingSortOption) {
		setSort(value);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<TabList items={TAB_ITEMS} value={tab} onChange={handleTabChange} variant="filled" />
				<Select options={SORT_OPTIONS} value={sort} onChange={handleSortChange} />
			</div>

			{tab === "issues" ? (
				MOCK_TRACKED_ISSUES.length > 0 ? (
					<div className="space-y-4">
						{MOCK_TRACKED_ISSUES.map((issue) => (
							<a key={issue.id} href={`/issues/${issue.id}`} className="block">
								<TrackingIssueCard {...issue} />
							</a>
						))}
					</div>
				) : (
					<EmptyState title="추적 중인 이슈가 없습니다" description="관심 있는 이슈를 추적해 보세요." />
				)
			) : MOCK_SAVED_EVENTS.length > 0 ? (
				<div className="space-y-4">
					{MOCK_SAVED_EVENTS.map((event) => (
						<TrackingSavedEventCard key={event.id} {...event} />
					))}
				</div>
			) : (
				<EmptyState title="저장한 사건이 없습니다" description="중요한 사건을 저장해 보세요." />
			)}
		</div>
	);
}
