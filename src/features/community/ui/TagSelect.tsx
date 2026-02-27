"use client";

import { Badge, Input } from "@kim-yeo-appweb-lab/ui";
import { X } from "lucide-react";
import { type KeyboardEvent, useId, useRef, useState } from "react";

import { type Tag } from "../../../shared/types/common";

type TagSelectProps = {
	tags: Tag[];
	selectedIds: string[];
	onChange: (ids: string[]) => void;
	maxTags?: number;
	isLoading?: boolean;
};

export function TagSelect({ tags, selectedIds, onChange, maxTags = 3, isLoading }: TagSelectProps) {
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const listboxId = useId();

	const isMaxReached = selectedIds.length >= maxTags;

	const filteredTags = tags.filter((tag) => !selectedIds.includes(tag.id) && tag.name.includes(search));

	const selectedTags = tags.filter((tag) => selectedIds.includes(tag.id));

	const handleSelect = (tagId: string) => {
		if (isMaxReached) return;
		onChange([...selectedIds, tagId]);
		setSearch("");
		inputRef.current?.focus();
	};

	const handleRemove = (tagId: string) => {
		onChange(selectedIds.filter((id) => id !== tagId));
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && search === "" && selectedIds.length > 0) {
			onChange(selectedIds.slice(0, -1));
		}

		if (e.key === "Escape") {
			setIsOpen(false);
		}
	};

	const handleFocus = () => {
		setIsOpen(true);
	};

	const handleBlur = () => {
		// 드롭다운 클릭이 blur보다 먼저 발생하도록 지연
		setTimeout(() => setIsOpen(false), 150);
	};

	if (isLoading) {
		return <div className="bg-surface-secondary border-border h-10 animate-pulse rounded-md border" />;
	}

	return (
		<div className="relative">
			<div
				className="border-border focus-within:ring-primary/20 flex flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 transition-all focus-within:ring-2"
				onClick={() => inputRef.current?.focus()}
				role="combobox"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-controls={listboxId}
			>
				{selectedTags.map((tag) => (
					<Badge key={tag.id} variant="subtle" colorScheme="info" className="gap-1 pr-1">
						{tag.name}
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								handleRemove(tag.id);
							}}
							className="hover:bg-info/20 rounded-full p-0.5 transition-colors"
							aria-label={`${tag.name} 태그 제거`}
						>
							<X size={12} />
						</button>
					</Badge>
				))}
				<Input
					ref={inputRef}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					placeholder={isMaxReached ? `최대 ${maxTags}개` : "태그 검색..."}
					disabled={isMaxReached}
					className="min-w-[80px] flex-1 border-0 p-0 shadow-none focus:ring-0"
					aria-autocomplete="list"
					aria-controls={listboxId}
				/>
			</div>

			{isOpen && filteredTags.length > 0 && (
				<ul
					id={listboxId}
					role="listbox"
					className="bg-surface border-border absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border shadow-md"
				>
					{filteredTags.map((tag) => (
						<li
							key={tag.id}
							role="option"
							aria-selected={false}
							className="text-fg hover:bg-surface-secondary cursor-pointer px-3 py-2 text-sm transition-colors"
							onMouseDown={() => handleSelect(tag.id)}
						>
							<span>{tag.name}</span>
							<span className="text-fg-muted ml-2 text-xs">{tag.type === "category" ? "분야" : "지역"}</span>
						</li>
					))}
				</ul>
			)}

			{isOpen && filteredTags.length === 0 && search && (
				<div className="bg-surface border-border absolute z-10 mt-1 w-full rounded-md border px-3 py-4 text-center shadow-md">
					<span className="text-fg-muted text-sm">검색 결과가 없습니다</span>
				</div>
			)}
		</div>
	);
}
