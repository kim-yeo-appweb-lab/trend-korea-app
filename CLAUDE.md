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

## 디렉토리 구조 (FSD 2.0 + Next.js App Router)

**Feature-Sliced Design 아키텍처 Best Practice**를 따르며, Next.js App Router와 통합합니다.

> **핵심 원칙**: 라우팅(Next `app/`)은 프레임워크 규칙대로 얇게 두되, 비즈니스 구조는 `src/`의 FSD 레이어로 유지하고, 둘을 "얇은 어댑터"로 연결합니다.

```
src/
├── app/                          # FSD: 앱 초기화 레이어 + Next.js 라우팅
│   ├── providers/                # 전역 Providers (Theme, Auth 등)
│   ├── config/                   # 앱 설정 (폰트 등)
│   ├── styles/                   # 글로벌 스타일
│   ├── index.ts                  # Public API
│   ├── layout.tsx                # Next.js 루트 레이아웃
│   ├── not-found.tsx
│   ├── (auth)/                   # 인증 Route Group
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── (main)/                   # 메인 Route Group
│       ├── layout.tsx
│       ├── page.tsx              # pages/home에서 re-export
│       ├── timeline/
│       │   ├── page.tsx          # pages/timeline에서 re-export
│       │   └── [date]/page.tsx
│       ├── issues/
│       │   ├── page.tsx
│       │   └── [id]/page.tsx
│       ├── community/
│       │   ├── page.tsx
│       │   ├── write/page.tsx
│       │   └── [id]/page.tsx
│       ├── search/page.tsx
│       ├── tracking/page.tsx
│       └── mypage/
│           ├── page.tsx
│           └── edit/page.tsx
│
├── views/                        # FSD: 뷰 레이어 (라우트별 페이지 컴포넌트)
│   ├── home/                     # ⚠️ Next.js와의 충돌 방지를 위해 'pages' 대신 'views' 사용
│   │   ├── ui/HomePage.tsx
│   │   └── index.ts
│   ├── timeline/
│   │   ├── ui/TimelinePage.tsx
│   │   └── index.ts
│   ├── timeline-date/
│   ├── issues/
│   ├── issue-detail/
│   ├── community/
│   ├── community-detail/
│   ├── community-write/
│   ├── search/
│   ├── tracking/
│   ├── mypage/
│   ├── mypage-edit/
│   ├── login/
│   └── register/
│
├── widgets/                      # FSD: 위젯 레이어 (독립적 UI 블록)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── index.ts
│
├── features/                     # FSD: 기능 레이어 (비즈니스 기능)
│   ├── timeline/
│   │   ├── ui/                   # React 컴포넌트
│   │   ├── model/                # 타입, 훅, 비즈니스 로직
│   │   └── index.ts              # Public API
│   ├── issues/
│   ├── community/
│   ├── search/
│   ├── tracking/
│   ├── mypage/
│   ├── home/
│   └── auth/
│
├── entities/                     # FSD: 엔티티 레이어 (비즈니스 도메인)
│   ├── event/
│   │   ├── model/types.ts        # Event, Importance, VerificationStatus
│   │   └── index.ts
│   ├── issue/
│   │   ├── model/types.ts        # Issue, Trigger, IssueStatus
│   │   └── index.ts
│   ├── post/
│   │   ├── model/types.ts
│   │   └── index.ts
│   ├── comment/
│   │   ├── model/types.ts
│   │   └── index.ts
│   ├── user/
│   │   ├── model/types.ts
│   │   └── index.ts
│   ├── tag/
│   │   ├── model/types.ts
│   │   └── index.ts
│   └── source/
│       ├── model/types.ts
│       └── index.ts
│
└── shared/                       # FSD: 공유 레이어 (재사용 가능한 유틸)
    ├── components/               # 공통 UI
    ├── hooks/                    # 공통 훅
    ├── types/                    # 공통 타입 (필터, 페이지네이션 등)
    ├── utils/                    # 유틸리티 함수
    └── lib/                      # 외부 라이브러리 연동
```

### FSD 세그먼트 구조

각 slice(기능/엔티티) 내부는 표준 세그먼트로 구성:

- **ui/** - React 컴포넌트, 스타일
- **model/** - 타입, 상태, 훅, 비즈니스 로직
- **api/** - 백엔드 통신 (필요시)
- **lib/** - 유틸리티 함수 (필요시)
- **index.ts** - Public API (외부 노출 인터페이스)

### 네이밍 규칙

- **Next.js 파일**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` (Next.js 컨벤션)
- **컴포넌트 파일**: PascalCase (`EventCard.tsx`, `IssueFilter.tsx`)
- **유틸리티/훅**: camelCase (`formatDate.ts`, `useDebounce.ts`)
- **Public API**: 각 slice의 `index.ts`로 외부 인터페이스 노출
- **세그먼트 폴더**: ui, model, api, lib (FSD 표준)

## 아키텍처 원칙 (FSD 2.0)

### 레이어 의존성 규칙

```
app → views → widgets → features → entities → shared
(상위)                                          (하위)
```

- **상위 → 하위만 허용**: 상위 레이어는 하위 레이어를 import 가능, 역방향 금지
- **동일 레이어 내 슬라이스 격리**: 같은 레이어 내 슬라이스 간 직접 import 금지
  - ❌ `features/timeline` → `features/issues`
  - ✅ `features/timeline` → `entities/event`

### Public API 패턴

- **모든 slice는 index.ts를 통해 노출**: 내부 구조 캡슐화
- **내부 파일 직접 import 금지**:
  - ❌ `from '@/features/timeline/ui/TimelineList'`
  - ✅ `from '@/features/timeline'` (또는 상대 경로 `from '../../../features/timeline'`)

### 세그먼트 구조

- **ui/**: React 컴포넌트, 스타일
- **model/**: 타입(`types.ts`), 상태, 훅(`hooks.ts`), 비즈니스 로직
- **api/**: 백엔드 API 통신 (필요 시)
- **lib/**: 유틸리티 함수 (필요 시)

### Next.js 통합

- **`app/` 폴더**: Next.js 라우팅 + FSD app 레이어 공존
  - Route Group: `(auth)`, `(main)` - 라우팅
  - providers, config, styles - FSD app 레이어 (라우팅 아님)
- **`pages/` 레이어**: page.tsx는 pages 레이어에서 re-export
- **Server Component 우선**: 데이터 페칭은 Server Component로, 인터랙션만 Client Component
- **Route Group 활용**: `(auth)`/`(main)`으로 레이아웃 분리, URL에 영향 없음

## 참고 문서

- `docs/PRD.md` - 상세 제품 요구사항
- `docs/BRANCH_STRATEGY.md` - Git 브랜칭 및 워크플로우 가이드
