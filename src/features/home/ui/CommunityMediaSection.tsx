import { SectionHeader } from "@kim-yeo-appweb-lab/ui";

import { type CommunityMediaCardData } from "../model";
import { CommunityMediaCard } from "./CommunityMediaCard";

const DUMMY_MEDIA: CommunityMediaCardData[] = [
	{
		id: "1",
		title: "서울 지하철 9호선 연장 구간 예상 노선도",
		imageUrl: "/placeholder.jpg",
		viewCount: 3420,
		createdAt: "2시간 전"
	},
	{
		id: "2",
		title: "2026 추경 편성 규모 비교 인포그래픽",
		imageUrl: "/placeholder.jpg",
		viewCount: 2891,
		createdAt: "3시간 전"
	},
	{
		id: "3",
		title: "강원 산불 위성 사진으로 본 피해 현황",
		imageUrl: "/placeholder.jpg",
		viewCount: 2150,
		createdAt: "4시간 전"
	},
	{
		id: "4",
		title: "한미 정상회담 역대 주요 합의사항 정리",
		imageUrl: "/placeholder.jpg",
		viewCount: 1873,
		createdAt: "5시간 전"
	},
	{
		id: "5",
		title: "AI 디지털 교과서 실제 사용 화면 공개",
		imageUrl: "/placeholder.jpg",
		viewCount: 1542,
		createdAt: "6시간 전"
	},
	{
		id: "6",
		title: "코스피 3,100 돌파 기념 역사적 지수 추이",
		imageUrl: "/placeholder.jpg",
		viewCount: 1205,
		createdAt: "7시간 전"
	}
];

export function CommunityMediaSection() {
	return (
		<section>
			<SectionHeader title="커뮤니티 미디어" href="/community" />
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
				{DUMMY_MEDIA.map((item) => (
					<CommunityMediaCard key={item.id} item={item} />
				))}
			</div>
		</section>
	);
}
