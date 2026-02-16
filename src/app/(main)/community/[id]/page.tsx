import { Breadcrumb } from "@kim-yeo-appweb-lab/ui";

import { CommentForm, CommentTree, PostActions, PostDetail } from "../../../../features/community/components";
import { type Comment, type Post, type Tag } from "../../../../shared/types";

// Mock 데이터
const MOCK_TAGS: Tag[] = [
	{ id: "t1", name: "정치", type: "category", slug: "politics" },
	{ id: "t2", name: "사회", type: "category", slug: "society" }
];

const MOCK_POST: Post = {
	id: "p1",
	authorId: "u1",
	authorNickname: "시민기자",
	authorImage: undefined,
	title: "추경안 통과에 대한 시민 반응 정리",
	content: `오늘 국회에서 15조원 규모의 추가경정예산안이 통과되었습니다.

주요 내용을 정리하면 다음과 같습니다:

1. 민생안정 분야: 5조원
   - 소상공인 지원금 확대
   - 취약계층 긴급복지 강화
   - 물가안정 대책 추진

2. 경제활성화 분야: 7조원
   - AI/반도체 산업 육성
   - 수출기업 지원
   - 일자리 창출 프로그램

3. 기타: 3조원
   - 재난 대응 체계 강화
   - 디지털 인프라 확충

시민들의 반응은 다양합니다. 찬성측은 경기 침체 우려에 대한 적극적 대응으로 평가하고, 반대측은 재정건전성 악화를 우려하고 있습니다.

여러분의 생각은 어떠신가요?`,
	tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
	isAnonymous: false,
	likeCount: 45,
	dislikeCount: 3,
	commentCount: 5,
	createdAt: "2026.02.15 14:30"
};

const MOCK_COMMENTS: Comment[] = [
	{
		id: "c1",
		postId: "p1",
		parentId: null,
		authorId: "u2",
		authorNickname: "경제전문가",
		content: "잘 정리된 글이네요. 추경의 효과가 실제 민생에 미치는 영향이 중요할 것 같습니다.",
		likeCount: 8,
		createdAt: "2시간 전",
		replies: [
			{
				id: "c2",
				postId: "p1",
				parentId: "c1",
				authorId: "u1",
				authorNickname: "시민기자",
				content: "감사합니다. 추경 집행 후 효과 분석도 추후 정리해 보겠습니다.",
				likeCount: 3,
				createdAt: "1시간 전"
			}
		]
	},
	{
		id: "c3",
		postId: "p1",
		parentId: null,
		authorId: "u3",
		authorNickname: "재정건전성",
		content: "재정건전성에 대한 우려도 간과하면 안 될 것 같습니다. 국가 부채가 계속 증가하고 있는 상황에서...",
		likeCount: 12,
		createdAt: "1시간 30분 전",
		replies: []
	},
	{
		id: "c4",
		postId: "p1",
		parentId: null,
		authorId: "u4",
		authorNickname: "정책분석가",
		content: "추경 규모가 적절한지에 대한 논의도 필요합니다. 15조원이 충분한 규모인지 의문입니다.",
		likeCount: 5,
		createdAt: "30분 전"
	}
];

type CommunityDetailPageProps = {
	params: Promise<{ id: string }>;
};

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
	const { id } = await params;

	return (
		<div className="mx-auto max-w-3xl px-4 py-6">
			<Breadcrumb
				items={[{ label: "홈", href: "/" }, { label: "커뮤니티", href: "/community" }, { label: MOCK_POST.title }]}
			/>
			<div className="mt-6 space-y-6">
				<PostDetail post={MOCK_POST} />
				<PostActions likeCount={MOCK_POST.likeCount} dislikeCount={MOCK_POST.dislikeCount} />
				<div className="space-y-4">
					<h2 className="text-fg text-base font-semibold">댓글 {MOCK_COMMENTS.length}개</h2>
					<CommentForm postId={id} />
					<CommentTree comments={MOCK_COMMENTS} />
				</div>
			</div>
		</div>
	);
}
