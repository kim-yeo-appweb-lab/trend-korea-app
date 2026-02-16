import { Breadcrumb } from "@kim-yeo-appweb-lab/ui";

import { ProfileEditForm } from "../../../../features/mypage";

export default function Page() {
	return (
		<div className="mx-auto max-w-lg px-4 py-6">
			<Breadcrumb
				items={[{ label: "홈", href: "/" }, { label: "MY 페이지", href: "/mypage" }, { label: "회원정보 수정" }]}
			/>
			<div className="mt-6">
				<h1 className="text-fg text-xl font-bold">회원정보 수정</h1>
				<div className="bg-surface border-border mt-4 rounded-lg border p-6">
					<ProfileEditForm />
				</div>
			</div>
		</div>
	);
}
