import { SearchResultList } from "../../../features/search/components";
import { SectionHeader } from "../../../shared/components";

export default function SearchPage() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-6">
			<SectionHeader title="검색" />
			<div className="mt-4">
				<SearchResultList />
			</div>
		</div>
	);
}
