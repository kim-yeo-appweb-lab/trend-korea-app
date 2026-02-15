import Link from "next/link";

import { Button, EmptyState } from "../shared/components";

export default function NotFoundPage() {
	return (
		<div className="bg-bg flex min-h-screen items-center justify-center">
			<EmptyState
				icon={
					<svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				}
				title="페이지를 찾을 수 없습니다"
				description="요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."
				action={
					<Button asChild>
						<Link href="/">홈으로 돌아가기</Link>
					</Button>
				}
			/>
		</div>
	);
}
