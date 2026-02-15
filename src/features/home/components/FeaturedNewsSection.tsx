import { Card, SectionHeader } from "../../../shared/components";
import { type FeaturedNewsCardData } from "../types";
import { FeaturedNewsCard } from "./FeaturedNewsCard";

const DUMMY_FEATURED_NEWS: FeaturedNewsCardData[] = [
	{
		id: "1",
		author: "한국경제",
		title: "삼성전자, 차세대 반도체 공정 투자 10조원 확대",
		summary:
			"삼성전자가 2나노 공정 양산을 위한 설비 투자를 대폭 늘리기로 했다. 글로벌 파운드리 경쟁에서 우위를 확보하기 위한 전략이다.",
		imageUrl: "/placeholder.jpg",
		createdAt: "30분 전"
	},
	{
		id: "2",
		author: "연합뉴스",
		title: '기상청 "2월 중순 한파 예보, 전국 영하 10도 이하"',
		summary: "기상청은 2월 중순 강한 한파가 예상된다며 전국적으로 영하 10도 이하의 기온이 예상된다고 밝혔다.",
		imageUrl: "/placeholder.jpg",
		createdAt: "1시간 전"
	},
	{
		id: "3",
		author: "MBC",
		title: "서울시, 청년 주거 지원 사업 대상 2배 확대",
		summary: "서울시가 올해 청년 주거 지원 사업의 지원 대상을 기존 대비 2배로 확대한다고 발표했다.",
		createdAt: "2시간 전"
	},
	{
		id: "4",
		author: "KBS",
		title: "국회, 민생법안 처리 속도전... 여야 합의 난항",
		summary: "국회는 민생 관련 법안 처리를 서두르고 있으나 여야 간 입장 차이로 합의가 쉽지 않은 상황이다.",
		imageUrl: "/placeholder.jpg",
		createdAt: "3시간 전"
	}
];

export function FeaturedNewsSection() {
	return (
		<section>
			<SectionHeader title="주요 뉴스">
				<span className="text-status-closed flex items-center gap-1 text-xs">
					<span className="bg-status-closed inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
					실시간
				</span>
			</SectionHeader>
			<Card>
				{DUMMY_FEATURED_NEWS.map((item) => (
					<FeaturedNewsCard key={item.id} item={item} />
				))}
			</Card>
		</section>
	);
}
