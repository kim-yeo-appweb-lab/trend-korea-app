import { ProfileEditForm } from "../../../../features/mypage/components";
import { Breadcrumb, Card } from "../../../../shared/components";

export default function MyPageEditPage() {
	return (
		<div className="mx-auto max-w-lg px-4 py-6">
			<Breadcrumb
				items={[{ label: "홈", href: "/" }, { label: "MY 페이지", href: "/mypage" }, { label: "회원정보 수정" }]}
			/>
			<div className="mt-6">
				<h1 className="text-fg text-xl font-bold">회원정보 수정</h1>
				<Card className="mt-4 p-6">
					<ProfileEditForm />
				</Card>
			</div>
		</div>
	);
}
