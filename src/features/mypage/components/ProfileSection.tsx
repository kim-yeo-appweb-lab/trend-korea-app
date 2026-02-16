import { Avatar } from "@kim-yeo-appweb-lab/ui";

import { Card, CardContent } from "../../../shared/components";

type ProfileSectionProps = {
	nickname: string;
	email: string;
	profileImage: string | null;
	createdAt: string;
};

export function ProfileSection({ nickname, email, profileImage, createdAt }: ProfileSectionProps) {
	return (
		<Card>
			<CardContent className="flex items-center gap-4">
				<Avatar src={profileImage} name={nickname} size="lg" />
				<div>
					<h2 className="text-fg text-lg font-bold">{nickname}</h2>
					<p className="text-fg-muted text-sm">{email}</p>
					<p className="text-fg-muted mt-1 text-xs">가입일: {createdAt}</p>
				</div>
			</CardContent>
		</Card>
	);
}
