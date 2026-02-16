/* ═══════════════════════════════════════════════════════════════════
 * kim-yeo-ui 디자인 시스템 컴포넌트
 * ═══════════════════════════════════════════════════════════════════ */
import { Card as KimYeoCard } from "@kim-yeo-appweb-lab/ui";

export {
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	EmptyState,
	Filter,
	FilterGroup,
	Input,
	Modal,
	Pagination,
	SectionHeader,
	Select,
	Skeleton,
	TabList,
	TagInput,
	Textarea
} from "@kim-yeo-appweb-lab/ui";

/* Card compound component를 개별 export로 분리 */
export const Card = KimYeoCard;
export const CardHeader = KimYeoCard.Header;
export const CardTitle = KimYeoCard.Title;
export const CardContent = KimYeoCard.Content;
export const CardFooter = KimYeoCard.Footer;

/* ═══════════════════════════════════════════════════════════════════
 * 프로젝트 전용 컴포넌트
 * ═══════════════════════════════════════════════════════════════════ */
export { Logo } from "./Logo";
export { SourceLink } from "./SourceLink";
export { ThemeToggle } from "./ThemeToggle";
