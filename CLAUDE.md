# 트렌드 코리아 - 프론트엔드

대한민국 사건/이슈 타임라인 추적 서비스

## 프로젝트 개요

- Next.js 16 (App Router) + React 19 + TypeScript 5.9 + Tailwind CSS 4
- 패키지 매니저: pnpm
- Node.js: v24.13.0 (.nvmrc)

## 스크립트

- `pnpm dev` - 개발 서버
- `pnpm build` - 프로덕션 빌드
- `pnpm lint` / `pnpm lint:fix` - ESLint
- `pnpm format` / `pnpm format:check` - Prettier
- `pnpm type:check` - TypeScript 타입 체크

## 코드 규칙

### Import

- 상대 경로 사용 (path alias 미사용)
- named export 우선 (default export 지양)
- 순서: external → internal → relative (`eslint-plugin-simple-import-sort`로 자동 정렬)
- 타입 import: `import { type Foo }` 인라인 형식 (`consistent-type-imports`)

### 커밋 컨벤션

- Conventional Commits 형식: `<타입>: <제목>`
- 한국어 작성, 이모지 사용 금지
- 타입: feat, fix, docs, style, refactor, perf, test, chore
- 작은 작업 단위로 분리하여 커밋

### Git Hooks (lefthook)

- **pre-commit**: Prettier 포맷팅 → ESLint 검사 (staged 파일 대상)
- **prepare-commit-msg**: 커밋 메시지 템플릿 자동 적용
- **pre-push**: type-check + lint + format:check (병렬 실행)

### CI (GitHub Actions)

PR 생성 시 자동 실행: `type:check` → `lint` → `format:check` → `build`

## 도메인 용어

코드에서 사용하는 도메인 엔티티와 한/영 매핑:

| 한글   | 영문 (코드) | 설명                              |
| ------ | ----------- | --------------------------------- |
| 사건   | `Event`     | 특정 일자에 발생한 단일 이벤트    |
| 이슈   | `Issue`     | 언론/SNS에서 지속 추적되는 주제   |
| 트리거 | `Trigger`   | 이슈에 대한 새로운 업데이트       |
| 태그   | `Tag`       | 사건/이슈 분류 라벨 (분야/지역)   |
| 출처   | `Source`    | 뉴스 기사, 공식 발표 등 참고 자료 |
| 게시글 | `Post`      | 커뮤니티 게시글                   |
| 댓글   | `Comment`   | 게시글 댓글/대댓글                |

### 이슈 상태값

- `ongoing` (진행중) / `closed` (종결) / `reignited` (재점화) / `unverified` (확인필요)

## 라우트 구조

```
/                          메인 (홈)
/timeline                  타임라인 (일자별 사건 아카이브)
/timeline/:date            특정 날짜 타임라인
/issues                    이슈 추적 목록
/issues/:id                이슈 상세
/community                 커뮤니티
/community/write           글쓰기
/community/:id             게시글 상세
/search                    검색
/tracking                  내 추적
/mypage                    MY 페이지
/mypage/edit               회원 정보 수정
```

## 디렉토리 구조 (Features + Shared 패턴)

**Features + Shared 패턴**을 기반으로 한 단순화된 레이어드 아키텍처입니다.

> **핵심 원칙**:
>
> 1. `app/`은 라우팅 & features 조립만
> 2. `features/`는 도메인 기능 (components, types, services, hooks)
> 3. `shared/`는 도메인 중립 (ui, lib, types, config)
>
> **의존성**: `app → features → shared` (역방향 금지)

```
src/
├── app/                           # Next.js 라우팅 + 조립
│   ├── (auth)/                    # 인증 Route Group
│   │   ├── layout.tsx
│   │   ├── login/page.tsx         # features/auth 직접 조합
│   │   └── register/page.tsx
│   ├── (main)/                    # 메인 Route Group
│   │   ├── layout.tsx
│   │   ├── page.tsx               # features/home 7개 섹션 조합
│   │   ├── timeline/
│   │   ├── issues/
│   │   ├── community/
│   │   ├── search/
│   │   ├── tracking/
│   │   └── mypage/
│   ├── providers/                 # 전역 Providers
│   ├── config/                    # 앱 설정
│   └── styles/                    # 글로벌 스타일
│
├── features/                      # 도메인 기능 (독립적)
│   ├── timeline/
│   │   ├── ui/                    # 컴포넌트
│   │   ├── model/                 # 타입, 훅
│   │   │   ├── types.ts           # Event, Importance 등
│   │   │   ├── hooks.ts
│   │   │   └── index.ts
│   │   ├── utils/                 # feature 전용 유틸
│   │   │   └── badgeMapping.ts    # importanceBadgeMap
│   │   └── index.ts               # Public API
│   ├── issues/
│   │   ├── ui/
│   │   ├── model/
│   │   │   └── types.ts           # Issue, IssueStatus, Trigger
│   │   ├── utils/
│   │   │   └── badgeMapping.ts    # issueStatusBadgeMap
│   │   └── index.ts
│   ├── community/
│   │   ├── ui/
│   │   ├── model/
│   │   │   └── types.ts           # Post, Comment
│   │   └── index.ts
│   ├── auth/
│   │   ├── ui/
│   │   ├── model/
│   │   │   └── types.ts           # User
│   │   └── index.ts
│   ├── mypage/
│   ├── search/
│   ├── tracking/
│   └── home/
│
├── shared/                        # 도메인 중립 (역할 제한)
│   ├── ui/                        # UI primitives만
│   │   ├── Logo.tsx
│   │   ├── SourceLink.tsx         # Source는 공통 타입
│   │   └── index.ts
│   ├── lib/utils/                 # 도메인 없는 유틸
│   │   ├── date.ts                # formatDate 등
│   │   └── index.ts
│   └── types/                     # 공통 타입만
│       ├── common.ts              # Tag, Source (공통!)
│       ├── filter.ts              # PeriodFilter 등
│       └── index.ts
│
└── widgets/                       # 전역 레이아웃
    ├── Header.tsx
    └── Footer.tsx
```

### Feature 세그먼트 구조

각 feature 내부는 표준 세그먼트로 구성:

- **ui/** - React 컴포넌트
- **model/** - 타입, 상태, 훅, 비즈니스 로직
  - `types.ts` - 도메인 타입 정의
  - `hooks.ts` - 커스텀 훅
  - `index.ts` - Public API
- **utils/** - feature 전용 유틸리티 (필요시)
- **index.ts** - Public API (외부 노출 인터페이스)

### 네이밍 규칙

- **Next.js 파일**: `page.tsx`, `layout.tsx` (Next.js 컨벤션)
- **컴포넌트 파일**: PascalCase (`EventCard.tsx`)
- **유틸리티/훅**: camelCase (`formatDate.ts`, `useDebounce.ts`)
- **Public API**: 각 feature의 `index.ts`로 외부 인터페이스 노출
- **세그먼트 폴더**: ui, model, utils (표준)

## 아키텍처 원칙

### 레이어 의존성 규칙

```
app → features → shared
(라우팅) (도메인)  (공통)
```

- **역방향 금지**: `shared → features` ❌, `features → app` ❌
- **Feature 간 격리**: `features/timeline → features/issues` ❌
- **Shared만 허용**: `features/timeline → shared/types/common` ✅

### 타입 소유권

- **도메인 타입 → Features**: Event(timeline), Issue(issues), Post(community), User(auth)
- **공통 타입 → Shared**: Tag, Source (3개 이상 feature에서 사용)

### Public API 패턴

```typescript
// features/timeline/index.ts
export { TimelineDateHeader, TimelineEventCard, TimelineList } from "./ui";

export type { Event, Importance, TimelineDateGroup } from "./model";

export { useTimelineFilter } from "./model";
```

```typescript
// ✅ Good: Public API 사용
import { TimelineList, type Event } from "../../features/timeline";

// ❌ Bad: 내부 구조 직접 참조
import { TimelineList } from "../../features/timeline/ui/TimelineList";
```

### Import 규칙

```typescript
// ✅ App → Features
import { TimelineList } from "../../features/timeline";

// ✅ Features → Features (동일 feature 내부)
import { type Event } from "../model/types";
import { importanceBadgeMap } from "../utils/badgeMapping";

// ✅ Features → Shared
import { type Tag } from "../../shared/types/common";
import { formatDate } from "../../shared/lib/utils";

// ❌ Features → Features (다른 feature)
import { IssueCard } from "../../features/issues";

// ❌ Shared → Features
import { type Event } from "../../features/timeline";
```

### 예외: Tracking Feature

`tracking` feature는 예외적으로 `issues` feature의 타입을 import 허용:

```typescript
// features/tracking/ui/TrackingIssueCard.tsx
import { type IssueStatus } from "../../issues/model"; // ✅ 예외 허용
```

**주의**: 타입만 허용, 컴포넌트나 로직은 금지

## 참고 문서

- `ARCHITECTURE.md` - 아키텍처 상세 가이드 (Features + Shared 패턴)
- `docs/PRD.md` - 상세 제품 요구사항
- `docs/BRANCH_STRATEGY.md` - Git 브랜칭 및 워크플로우 가이드
