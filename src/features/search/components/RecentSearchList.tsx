"use client";

import { useState } from "react";

type RecentSearchListProps = {
	onSearch: (query: string) => void;
};

const INITIAL_SEARCHES = [
	"추경안",
	"대중교통 요금",
	"AI 반도체",
	"기준금리",
	"플랫폼 노동자",
	"대설 특보",
	"국회 본회의",
	"부동산 시장"
];

export function RecentSearchList({ onSearch }: RecentSearchListProps) {
	const [searches, setSearches] = useState(INITIAL_SEARCHES);

	function handleRemove(keyword: string) {
		setSearches((prev) => prev.filter((s) => s !== keyword));
	}

	function handleClick(keyword: string) {
		onSearch(keyword);
	}

	function handleClearAll() {
		setSearches([]);
	}

	if (searches.length === 0) return null;

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<h3 className="text-fg text-sm font-semibold">최근 검색어</h3>
				<button
					type="button"
					onClick={handleClearAll}
					className="text-fg-muted hover:text-fg-secondary text-xs transition-colors"
				>
					전체 삭제
				</button>
			</div>
			<div className="flex flex-wrap gap-2">
				{searches.map((keyword) => (
					<div key={keyword} className="bg-surface-alt flex items-center gap-1 rounded-full px-3 py-1.5">
						<button
							type="button"
							onClick={() => handleClick(keyword)}
							className="text-fg-secondary hover:text-fg text-sm transition-colors"
						>
							{keyword}
						</button>
						<button
							type="button"
							onClick={() => handleRemove(keyword)}
							className="text-fg-muted hover:text-fg"
							aria-label={`${keyword} 삭제`}
						>
							<svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
