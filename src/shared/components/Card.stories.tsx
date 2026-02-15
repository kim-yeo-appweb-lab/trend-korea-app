import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";

const meta = {
	title: "Shared/Card",
	component: Card
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "기본 카드 콘텐츠입니다."
	}
};

export const WithHeader: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>카드 제목</CardTitle>
			</CardHeader>
			<CardContent>카드 본문 내용이 들어갑니다.</CardContent>
		</Card>
	)
};

export const WithFooter: Story = {
	render: () => (
		<Card>
			<CardContent>카드 본문 내용이 들어갑니다.</CardContent>
			<CardFooter>
				<span className="text-fg-muted text-xs">2024.01.15</span>
				<span className="text-fg-muted text-xs">조회 1,234</span>
			</CardFooter>
		</Card>
	)
};

export const FullComposition: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>전체 구성 카드</CardTitle>
				<span className="text-primary text-sm">더보기</span>
			</CardHeader>
			<CardContent>
				Compound 패턴으로 Card, CardHeader, CardTitle, CardContent, CardFooter를 자유롭게 조합할 수 있습니다.
			</CardContent>
			<CardFooter>
				<span className="text-fg-muted text-xs">2024.01.15 14:30</span>
				<span className="text-fg-muted text-xs">댓글 42</span>
			</CardFooter>
		</Card>
	)
};
