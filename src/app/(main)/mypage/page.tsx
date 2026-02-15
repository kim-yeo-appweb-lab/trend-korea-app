import {
	AccountActions,
	AccountSection,
	ProfileSection,
	ServiceInfoSection
} from "../../../features/mypage/components";

export default function MyPage() {
	return (
		<div className="mx-auto max-w-lg px-4 py-6">
			<h1 className="text-fg mb-6 text-xl font-bold">MY 페이지</h1>
			<div className="space-y-4">
				<ProfileSection nickname="시민기자" email="user@example.com" profileImage={null} createdAt="2026.01.15" />
				<AccountSection />
				<ServiceInfoSection />
				<AccountActions />
			</div>
		</div>
	);
}
