"use client";

import { Button, Pagination, Select, TabList } from "@kim-yeo-appweb-lab/ui";
import Link from "next/link";
import { useState } from "react";

import { type CommunitySortOption, type CommunityTab, usePostList } from "../model";
import { PostCard } from "./PostCard";

const TAB_ITEMS = [
	{ value: "latest" as const, label: "최신" },
	{ value: "popular" as const, label: "인기" },
	{ value: "hot" as const, label: "HOT" }
];

const SORT_OPTIONS = [
	{ value: "latest" as const, label: "최신순" },
	{ value: "popular" as const, label: "추천순" },
	{ value: "comments" as const, label: "댓글순" }
];

const POSTS_PER_PAGE = 10;

export function PostList() {
	const [tab, setTab] = useState<CommunityTab>("latest");
	const [sort, setSort] = useState<CommunitySortOption>("latest");
	const [currentPage, setCurrentPage] = useState(1);
	const [cursors, setCursors] = useState<Record<number, string>>({});

	const { data, isLoading, isError } = usePostList({
		tab,
		sortBy: sort === "popular" ? "likeCount" : sort === "comments" ? "commentCount" : "createdAt",
		limit: POSTS_PER_PAGE,
		cursor: cursors[currentPage]
	});

	const handleTabChange = (value: CommunityTab) => {
		setTab(value);
		setCurrentPage(1);
		setCursors({});
	};

	const handleSortChange = (value: CommunitySortOption) => {
		setSort(value);
		setCurrentPage(1);
		setCursors({});
	};

	const handlePageChange = (page: number) => {
		if (page > currentPage && data?.cursor.next) {
			setCursors((prev) => ({ ...prev, [page]: data.cursor.next! }));
		}
		setCurrentPage(page);
	};

	const totalPages = data?.cursor.hasMore ? currentPage + 1 : currentPage;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<TabList items={TAB_ITEMS} value={tab} onChange={handleTabChange} variant="filled" />
				<div className="flex items-center gap-3">
					<Select options={SORT_OPTIONS} value={sort} onChange={handleSortChange} />
					<Button size="sm" asChild>
						<Link href="/community/write">글쓰기</Link>
					</Button>
				</div>
			</div>

			{isLoading && (
				<div className="text-fg-muted flex items-center justify-center py-12 text-sm">게시글을 불러오는 중...</div>
			)}

			{isError && (
				<div className="text-danger flex items-center justify-center py-12 text-sm">
					게시글을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
				</div>
			)}

			{data && data.items.length === 0 && (
				<div className="text-fg-muted flex flex-col items-center justify-center gap-2 py-12 text-sm">
					<p>아직 게시글이 없습니다.</p>
					<Button size="sm" variant="secondary" asChild>
						<Link href="/community/write">첫 글 작성하기</Link>
					</Button>
				</div>
			)}

			{data && data.items.length > 0 && (
				<>
					<div className="space-y-4">
						{data.items.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
					<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
				</>
			)}
		</div>
	);
}
