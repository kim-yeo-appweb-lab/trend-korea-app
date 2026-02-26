import { Button, EmptyState } from "@kim-yeo-appweb-lab/ui";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
	return (
		<div className="bg-bg flex min-h-screen items-center justify-center">
			<EmptyState
				icon={<Frown className="h-16 w-16" strokeWidth={1.5} />}
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
