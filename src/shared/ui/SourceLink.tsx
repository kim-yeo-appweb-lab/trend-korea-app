import { cn } from "@kim-yeo-appweb-lab/ui";

import { type Source } from "../types/common";

type SourceLinkProps = {
	source: Source;
	className?: string;
};

export function SourceLink({ source, className }: SourceLinkProps) {
	return (
		<a
			href={source.url}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"text-fg-secondary hover:text-primary inline-flex items-center gap-1 text-sm transition-colors",
				className
			)}
		>
			<span className="truncate">{source.publisher}</span>
			<svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				/>
			</svg>
		</a>
	);
}
