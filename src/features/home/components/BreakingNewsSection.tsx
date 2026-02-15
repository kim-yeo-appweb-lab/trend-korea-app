import { SectionHeader } from "../../../shared/components";
import { type BreakingNewsItemData } from "../types";
import { BreakingNewsItem } from "./BreakingNewsItem";

const DUMMY_BREAKING_NEWS: BreakingNewsItemData[] = [
	{
		id: "1",
		number: 1,
		time: "14:32",
		title: "정부, 2026년 추경 편성 공식 발표... 규모 15조원대",
		summary:
			"기획재정부는 오늘 오후 2시 브리핑을 통해 추가경정예산 편성 계획을 발표했다. 민생안정과 경기부양을 위한 재정 확대 방안이 핵심이다.",
		tags: ["경제", "정치"],
		importance: "high"
	},
	{
		id: "2",
		number: 2,
		time: "13:15",
		title: "서울 지하철 9호선 연장 구간 개통일 확정",
		summary: "서울시는 9호선 4단계 연장 구간의 개통일을 2026년 6월로 확정했다고 밝혔다.",
		tags: ["사회", "서울"],
		importance: "medium"
	},
	{
		id: "3",
		number: 3,
		time: "12:48",
		title: "대법원, 직장 내 괴롭힘 판단 기준 새 판례 제시",
		summary:
			"대법원 전원합의체는 직장 내 괴롭힘의 판단 기준을 구체화하는 판결을 내렸다. 업무상 적정 범위를 넘는 행위의 기준이 명확해졌다.",
		tags: ["사법", "노동"],
		importance: "high"
	},
	{
		id: "4",
		number: 4,
		time: "11:30",
		title: "한국은행 기준금리 동결... 올해 첫 결정",
		summary: "한국은행 금융통화위원회가 기준금리를 현 수준에서 동결하기로 결정했다.",
		tags: ["경제"],
		importance: "medium"
	},
	{
		id: "5",
		number: 5,
		time: "10:22",
		title: "강원도 산불 진화율 85%... 대응 2단계 유지",
		summary: "강원도 강릉 일대에서 발생한 산불의 진화율이 85%에 도달했으나, 바람이 강해져 대응 단계를 유지한다.",
		tags: ["재난", "강원"],
		importance: "medium"
	},
	{
		id: "6",
		number: 6,
		time: "09:45",
		title: "외교부, 한미 정상회담 일정 공식 발표",
		summary: "외교부는 다음 달 초 한미 정상회담 일정을 공식 발표했다. 반도체 공급망 협력이 핵심 의제다.",
		tags: ["외교안보"],
		importance: "medium"
	},
	{
		id: "7",
		number: 7,
		time: "09:10",
		title: '교육부, "AI 디지털 교과서" 시범 도입 학교 200곳 선정',
		summary: "교육부가 AI 디지털 교과서를 시범 도입할 전국 200개 학교를 선정했다고 발표했다.",
		tags: ["사회", "문화"],
		importance: "low"
	},
	{
		id: "8",
		number: 8,
		time: "08:30",
		title: "코스피 3,100 돌파... 외국인 매수세 지속",
		summary: "코스피 지수가 장 초반 3,100을 돌파하며 연중 최고치를 경신했다.",
		tags: ["경제"],
		importance: "medium"
	}
];

export function BreakingNewsSection() {
	return (
		<section>
			<SectionHeader title="속보" href="/timeline">
				<span className="text-fg-muted text-xs">2026.02.14 14:32 업데이트</span>
			</SectionHeader>
			<div className="border-border bg-surface overflow-hidden rounded-xl border">
				{DUMMY_BREAKING_NEWS.map((item) => (
					<BreakingNewsItem key={item.id} item={item} />
				))}
			</div>
		</section>
	);
}
