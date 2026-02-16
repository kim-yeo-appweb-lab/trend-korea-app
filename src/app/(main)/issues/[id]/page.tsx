import { Badge, Breadcrumb } from "@kim-yeo-appweb-lab/ui";

import { IssueDetailRelated, IssueDetailTimeline, IssueTrackButton } from "../../../../features/issues/components";
import { type Issue, type Tag, type Trigger } from "../../../../shared/types";
import { issueStatusBadgeMap } from "../../../../shared/utils";

// Mock 데이터 (상세 페이지용)
const MOCK_TAGS: Tag[] = [
	{ id: "t1", name: "정치", type: "category", slug: "politics" },
	{ id: "t4", name: "사법", type: "category", slug: "judiciary" },
	{ id: "t5", name: "노동", type: "category", slug: "labor" }
];

const MOCK_TRIGGERS: Trigger[] = [
	{
		id: "tr1",
		issueId: "i1",
		occurredAt: "2026-02-15T10:00:00",
		summary: "국회 본회의에서 추경안이 재적의원 과반 찬성으로 통과되었습니다.",
		type: "announcement",
		sources: [{ url: "#", title: "추경안 통과", publisher: "연합뉴스", publishedAt: "2026-02-15" }]
	},
	{
		id: "tr2",
		issueId: "i1",
		occurredAt: "2026-02-14T14:00:00",
		summary: "야당이 추경안 일부 항목에 대해 수정을 요구하며 협상이 진행되었습니다.",
		type: "article",
		sources: [{ url: "#", title: "야당 수정 요구", publisher: "한겨레", publishedAt: "2026-02-14" }]
	},
	{
		id: "tr3",
		issueId: "i1",
		occurredAt: "2026-02-12T09:00:00",
		summary: "정부가 15조원 규모의 추가경정예산안을 국회에 제출했습니다.",
		type: "announcement",
		sources: [{ url: "#", title: "추경안 제출", publisher: "기획재정부", publishedAt: "2026-02-12" }]
	}
];

const MOCK_ISSUE: Issue = {
	id: "i1",
	title: "2026년 추가경정예산안 국회 심의",
	description:
		"정부가 제출한 15조원 규모의 추경안이 국회에서 심의를 거쳐 본회의를 통과했습니다. 민생안정과 경제활성화를 위한 재원 마련이 핵심 쟁점이었으며, 여야 간 치열한 협상 끝에 최종 합의에 이르렀습니다.",
	status: "ongoing",
	tags: [MOCK_TAGS[0]],
	triggers: MOCK_TRIGGERS,
	trackerCount: 1234,
	relatedEventIds: ["e1"],
	sources: [{ url: "#", title: "추경안 심의", publisher: "연합뉴스", publishedAt: "2026-02-15" }]
};

const MOCK_RELATED_EVENTS = [
	{ id: "e1", title: "국회, 2026년 추경안 본회의 통과", occurredAt: "2026.02.15" },
	{ id: "e7", title: "기획재정부, 추경안 국회 제출", occurredAt: "2026.02.12" }
];

type IssueDetailPageProps = {
	params: Promise<{ id: string }>;
};

export default async function IssueDetailPage({ params }: IssueDetailPageProps) {
	const { id } = await params;
	const statusBadge = issueStatusBadgeMap[MOCK_ISSUE.status];

	return (
		<div className="mx-auto max-w-3xl px-4 py-6">
			<Breadcrumb
				items={[{ label: "홈", href: "/" }, { label: "이슈 추적", href: "/issues" }, { label: MOCK_ISSUE.title }]}
			/>
			<div className="mt-6 space-y-8">
				<div>
					<div className="mb-6 flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<Badge colorScheme={statusBadge.colorScheme} role="status" aria-label={`상태: ${statusBadge.label}`}>
								{statusBadge.label}
							</Badge>
							<span className="text-fg-muted text-sm">추적자 {MOCK_ISSUE.trackerCount}명</span>
						</div>
						<IssueTrackButton issueId={id} />
					</div>
					<div className="space-y-4">
						<h1 className="text-fg text-xl font-bold">{MOCK_ISSUE.title}</h1>
						<p className="text-fg-secondary text-sm leading-relaxed">{MOCK_ISSUE.description}</p>
						<div className="flex flex-wrap gap-1.5">
							{MOCK_ISSUE.tags.map((tag) => (
								<Badge key={tag.id}>{tag.name}</Badge>
							))}
						</div>
					</div>
				</div>
				<IssueDetailTimeline triggers={MOCK_ISSUE.triggers} />
				<IssueDetailRelated events={MOCK_RELATED_EVENTS} />
			</div>
		</div>
	);
}
