"use client";

import { Button, Modal } from "@kim-yeo-appweb-lab/ui";
import { useState } from "react";

import { type Event, type Tag } from "../../../shared/types";
import { useTimelineFilter } from "../hooks";
import { TimelineDateHeader } from "./TimelineDateHeader";
import { TimelineDatePicker } from "./TimelineDatePicker";
import { TimelineEventCard } from "./TimelineEventCard";
import { TimelineEventDetail } from "./TimelineEventDetail";
import { TimelineFilter } from "./TimelineFilter";
import { TimelineSortSelect } from "./TimelineSortSelect";

// Mock 데이터
const MOCK_TAGS: Tag[] = [
	{ id: "t1", name: "정치", type: "category", slug: "politics" },
	{ id: "t2", name: "사회", type: "category", slug: "society" },
	{ id: "t3", name: "경제", type: "category", slug: "economy" },
	{ id: "t4", name: "서울", type: "region", slug: "seoul" }
];

const MOCK_EVENTS: Event[] = [
	{
		id: "e1",
		occurredAt: "2026-02-15T09:30:00",
		title: "국회, 2026년 추경안 본회의 통과",
		summary:
			"국회 본회의에서 2026년 추가경정예산안이 재적의원 과반 찬성으로 통과되었습니다. 총 15조원 규모의 추경안에는 민생안정과 경제활성화를 위한 예산이 포함되어 있습니다.",
		tags: [MOCK_TAGS[0], MOCK_TAGS[3]],
		sources: [
			{
				url: "https://example.com/1",
				title: "국회 추경안 통과",
				publisher: "연합뉴스",
				publishedAt: "2026-02-15T10:00:00"
			},
			{
				url: "https://example.com/2",
				title: "추경 15조 규모 확정",
				publisher: "한겨레",
				publishedAt: "2026-02-15T10:30:00"
			}
		],
		importance: "high",
		verificationStatus: "verified",
		relatedIssueIds: ["i1"]
	},
	{
		id: "e2",
		occurredAt: "2026-02-15T14:00:00",
		title: "서울시, 대중교통 요금 인상안 발표",
		summary:
			"서울시가 버스·지하철 기본요금을 4월부터 200원 인상하는 방안을 발표했습니다. 물가 상승과 운영비 증가가 주요 원인으로 꼽힙니다.",
		tags: [MOCK_TAGS[1], MOCK_TAGS[3]],
		sources: [
			{
				url: "https://example.com/3",
				title: "서울 대중교통 요금 인상",
				publisher: "서울경제",
				publishedAt: "2026-02-15T14:30:00"
			}
		],
		importance: "medium",
		verificationStatus: "verified",
		relatedIssueIds: []
	},
	{
		id: "e3",
		occurredAt: "2026-02-15T16:45:00",
		title: "한국은행, 기준금리 동결 결정",
		summary:
			"한국은행 금융통화위원회가 기준금리를 현행 3.25%로 동결했습니다. 물가 안정세와 경기 회복 상황을 종합적으로 고려한 결정입니다.",
		tags: [MOCK_TAGS[2]],
		sources: [
			{
				url: "https://example.com/4",
				title: "기준금리 동결",
				publisher: "매일경제",
				publishedAt: "2026-02-15T17:00:00"
			},
			{
				url: "https://example.com/5",
				title: "한은 금리 결정 배경",
				publisher: "조선비즈",
				publishedAt: "2026-02-15T17:30:00"
			},
			{
				url: "https://example.com/6",
				title: "금리 동결 시장 반응",
				publisher: "한국경제",
				publishedAt: "2026-02-15T18:00:00"
			}
		],
		importance: "high",
		verificationStatus: "verified",
		relatedIssueIds: ["i2"]
	},
	{
		id: "e4",
		occurredAt: "2026-02-14T08:15:00",
		title: "전국 대설 특보 발령",
		summary: "기상청이 서울·경기를 포함한 중부지방에 대설 특보를 발령했습니다. 최대 20cm 이상의 폭설이 예상됩니다.",
		tags: [{ id: "t5", name: "재난", type: "category", slug: "disaster" }],
		sources: [
			{
				url: "https://example.com/7",
				title: "중부지방 대설 특보",
				publisher: "기상청",
				publishedAt: "2026-02-14T08:30:00"
			}
		],
		importance: "high",
		verificationStatus: "verified",
		relatedIssueIds: []
	},
	{
		id: "e5",
		occurredAt: "2026-02-14T11:00:00",
		title: "삼성전자, AI 반도체 신규 투자 발표",
		summary:
			"삼성전자가 AI 반도체 분야에 10조원 규모의 신규 투자를 발표했습니다. 평택 캠퍼스에 차세대 HBM 생산 라인을 증설합니다.",
		tags: [MOCK_TAGS[2]],
		sources: [
			{
				url: "https://example.com/8",
				title: "삼성 AI 반도체 투자",
				publisher: "전자신문",
				publishedAt: "2026-02-14T11:30:00"
			}
		],
		importance: "medium",
		verificationStatus: "verified",
		relatedIssueIds: []
	},
	{
		id: "e6",
		occurredAt: "2026-02-13T10:00:00",
		title: "대법원, 노동조합법 관련 전원합의체 판결",
		summary:
			"대법원 전원합의체가 노동조합법상 근로자 범위를 확대하는 판결을 내렸습니다. 플랫폼 종사자도 노동3권을 보장받게 됩니다.",
		tags: [
			{ id: "t6", name: "사법", type: "category", slug: "judiciary" },
			{ id: "t7", name: "노동", type: "category", slug: "labor" }
		],
		sources: [
			{
				url: "https://example.com/9",
				title: "대법원 노동조합법 판결",
				publisher: "법률신문",
				publishedAt: "2026-02-13T10:30:00"
			},
			{
				url: "https://example.com/10",
				title: "플랫폼 노동자 권리 확대",
				publisher: "경향신문",
				publishedAt: "2026-02-13T11:00:00"
			}
		],
		importance: "high",
		verificationStatus: "verified",
		relatedIssueIds: ["i3"]
	}
];

type TimelineDateGroupData = {
	date: string;
	dayOfWeek: string;
	events: Event[];
};

function groupEventsByDate(events: Event[]): TimelineDateGroupData[] {
	const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	const groups = new Map<string, Event[]>();

	for (const event of events) {
		const date = event.occurredAt.split("T")[0];
		const existing = groups.get(date) ?? [];
		groups.set(date, [...existing, event]);
	}

	return Array.from(groups.entries())
		.sort(([a], [b]) => b.localeCompare(a))
		.map(([date, evts]) => {
			const d = new Date(date);
			return {
				date: date.replace(/-/g, "."),
				dayOfWeek: dayNames[d.getDay()],
				events: evts.sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
			};
		});
}

export function TimelineList() {
	const { filter, sort, handleCategoryChange, handleRegionChange, handleImportanceChange, handleSortChange } =
		useTimelineFilter();
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [selectedDate, setSelectedDate] = useState<string>("");

	function handleDetailClick(id: string) {
		const event = MOCK_EVENTS.find((e) => e.id === id);
		if (event) setSelectedEvent(event);
	}

	function handleCloseModal() {
		setSelectedEvent(null);
	}

	function handleDateChange(date: string) {
		setSelectedDate(date);
	}

	const dateGroups = groupEventsByDate(MOCK_EVENTS);

	return (
		<div className="space-y-6">
			{/* 필터/정렬/날짜 컨트롤 */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<TimelineDatePicker value={selectedDate} onChange={handleDateChange} />
					<TimelineSortSelect value={sort} onChange={handleSortChange} />
				</div>
				<TimelineFilter
					filter={filter}
					onCategoryChange={handleCategoryChange}
					onRegionChange={handleRegionChange}
					onImportanceChange={handleImportanceChange}
				/>
			</div>

			{/* 타임라인 목록 */}
			<div className="space-y-2">
				{dateGroups.map((group) => (
					<div key={group.date}>
						<TimelineDateHeader date={group.date} dayOfWeek={group.dayOfWeek} />
						<div className="space-y-3 pl-2">
							{group.events.map((event) => (
								<div key={event.id} onClick={() => handleDetailClick(event.id)} className="cursor-pointer">
									<TimelineEventCard event={event} />
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* 더 불러오기 */}
			<div className="flex justify-center pt-4">
				<Button variant="secondary">더 불러오기</Button>
			</div>

			{/* 상세 모달 */}
			<Modal open={!!selectedEvent} onClose={handleCloseModal} title="사건 상세">
				{selectedEvent && <TimelineEventDetail event={selectedEvent} />}
			</Modal>
		</div>
	);
}
