"use client";

import { Button, cn } from "@kim-yeo-appweb-lab/ui";
import { Search } from "lucide-react";
import { useState } from "react";

type SearchBarProps = {
	onSearch: (query: string) => void;
	className?: string;
};

export function SearchBar({ onSearch, className }: SearchBarProps) {
	const [query, setQuery] = useState("");

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setQuery(e.target.value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (query.trim()) {
			onSearch(query.trim());
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	}

	return (
		<form onSubmit={handleSubmit} className={cn("relative", className)}>
			<input
				type="search"
				value={query}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder="사건, 이슈, 키워드를 검색하세요"
				className="border-border bg-surface text-fg placeholder:text-fg-muted focus:border-primary focus:ring-ring w-full rounded-xl border py-3 pr-12 pl-5 text-base transition-colors outline-none focus:ring-1"
			/>
			<Button
				variant="ghost"
				size="sm"
				type="submit"
				className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5"
				aria-label="검색"
			>
				<Search className="h-5 w-5" />
			</Button>
		</form>
	);
}
