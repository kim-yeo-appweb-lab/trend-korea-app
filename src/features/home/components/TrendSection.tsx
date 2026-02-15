"use client";

import { useState } from "react";

import { SectionHeader, TabList } from "../../../shared/components";
import { type TrendCardData } from "../types";
import { TrendCard } from "./TrendCard";

const DUMMY_TRENDS: TrendCardData[] = [
	{
		id: "1",
		rank: 1,
		title: "2026 추경 편성",
		changeRate: "+245%",
		tags: ["경제", "정치"],
		summary: "정부의 15조원 규모 추가경정예산 편성과 관련된 각계 반응 급증"
	},
	{
		id: "2",
		rank: 2,
		title: "반도체 수출 호조",
		changeRate: "+180%",
		tags: ["경제", "산업"],
		summary: "삼성전자, SK하이닉스 반도체 수출 호조로 무역수지 흑자 전환"
	},
	{
		id: "3",
		rank: 3,
		title: "서울 교통 인프라 확장",
		changeRate: "+156%",
		tags: ["사회", "교통"],
		summary: "9호선 연장, GTX-A 개통 등 수도권 교통 인프라 확충 소식 집중"
	},
	{
		id: "4",
		rank: 4,
		title: "직장 내 괴롭힘 판례",
		changeRate: "+120%",
		tags: ["사법", "노동"],
		summary: "대법원 전원합의체 판결로 직장 내 괴롭힘 판단 기준 명확화"
	},
	{
		id: "5",
		rank: 5,
		title: "AI 교육 혁신",
		changeRate: "+98%",
		tags: ["문화", "교육"],
		summary: "AI 디지털 교과서 시범 도입 확대와 교육 현장 변화에 대한 관심"
	}
];

const PERIOD_TAB_ITEMS = [
	{ value: "24시간", label: "24시간" },
	{ value: "7일", label: "7일" },
	{ value: "30일", label: "30일" }
] as const;

type PeriodValue = (typeof PERIOD_TAB_ITEMS)[number]["value"];

export function TrendSection() {
	const [activePeriod, setActivePeriod] = useState<PeriodValue>("24시간");

	function handlePeriodChange(value: PeriodValue) {
		setActivePeriod(value);
	}

	return (
		<section>
			<SectionHeader title="대한민국 트렌드">
				<TabList items={[...PERIOD_TAB_ITEMS]} value={activePeriod} onChange={handlePeriodChange} size="sm" />
			</SectionHeader>
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{DUMMY_TRENDS.map((trend) => (
					<TrendCard key={trend.id} item={trend} />
				))}
			</div>
		</section>
	);
}
