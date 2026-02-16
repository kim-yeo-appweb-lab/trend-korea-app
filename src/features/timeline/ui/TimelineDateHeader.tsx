import { cn } from "@kim-yeo-appweb-lab/ui";

type TimelineDateHeaderProps = {
	date: string;
	dayOfWeek: string;
	className?: string;
};

export function TimelineDateHeader({ date, dayOfWeek, className }: TimelineDateHeaderProps) {
	return (
		<div className={cn("flex items-center gap-3 py-3", className)}>
			<div className="bg-border h-px flex-1" />
			<time className="text-fg shrink-0 text-sm font-semibold">
				{date} <span className="text-fg-muted">{dayOfWeek}</span>
			</time>
			<div className="bg-border h-px flex-1" />
		</div>
	);
}
