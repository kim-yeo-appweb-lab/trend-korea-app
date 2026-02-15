"use client";

import { useState } from "react";

import { cn } from "../../../shared/utils";

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
			<button
				type="submit"
				className="text-fg-muted hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 transition-colors"
				aria-label="검색"
			>
				<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</form>
	);
}
