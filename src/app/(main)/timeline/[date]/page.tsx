import { Breadcrumb, SectionHeader } from "@kim-yeo-appweb-lab/ui";

import { TimelineList } from "../../../../features/timeline/components";

type TimelineDatePageProps = {
	params: Promise<{ date: string }>;
};

export default async function TimelineDatePage({ params }: TimelineDatePageProps) {
	const { date } = await params;
	const formattedDate = date.replace(/-/g, ".");

	return (
		<div className="mx-auto max-w-7xl px-4 py-6">
			<Breadcrumb
				items={[{ label: "홈", href: "/" }, { label: "타임라인", href: "/timeline" }, { label: formattedDate }]}
			/>
			<div className="mt-4">
				<SectionHeader title={`${formattedDate} 타임라인`} />
			</div>
			<div className="mt-6">
				<TimelineList />
			</div>
		</div>
	);
}
