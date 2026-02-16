import { AccountActions, AccountSection } from "../../../features/mypage";

export default function Page() {
	return (
		<div className="mx-auto max-w-lg px-4 py-6">
			<h1 className="text-fg mb-6 text-xl font-bold">MY 페이지</h1>
			<div className="space-y-4">
				<AccountSection />
				<AccountActions />
			</div>
		</div>
	);
}
