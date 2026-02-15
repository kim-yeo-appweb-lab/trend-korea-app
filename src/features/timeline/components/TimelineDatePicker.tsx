"use client";

import { cn } from "../../../shared/utils";

type TimelineDatePickerProps = {
	value?: string;
	onChange: (date: string) => void;
	className?: string;
};

export function TimelineDatePicker({ value, onChange, className }: TimelineDatePickerProps) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		onChange(e.target.value);
	}

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<label htmlFor="timeline-date" className="text-fg-secondary text-sm font-medium">
				날짜 선택
			</label>
			<input
				id="timeline-date"
				type="date"
				value={value ?? ""}
				onChange={handleChange}
				className="border-border bg-surface text-fg hover:border-border-strong focus:border-primary focus:ring-ring h-9 rounded-lg border px-3 text-sm transition-colors outline-none focus:ring-1"
			/>
		</div>
	);
}
