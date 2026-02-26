import { cn } from "@kim-yeo-appweb-lab/ui";
import { ExternalLink } from "lucide-react";

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
				"text-fg-secondary hover:text-primary m-0 inline-flex items-center gap-1 text-sm transition-colors",
				className
			)}
		>
			<span className="truncate">{source.publisher}</span>
			<ExternalLink className="h-3.5 w-3.5 shrink-0" />
		</a>
	);
}
