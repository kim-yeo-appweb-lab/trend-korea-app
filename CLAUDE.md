# 트렌드 코리아 - 프론트엔드

대한민국 사건/이슈 타임라인 추적 서비스

## 프로젝트 개요

- Next.js 16 (App Router) + React 19 + TypeScript 5.9 + Tailwind CSS 4
- 패키지 매니저: pnpm

## 스크립트

- `pnpm dev` - 개발 서버
- `pnpm build` - 프로덕션 빌드
- `pnpm lint` / `pnpm lint:fix` - ESLint
- `pnpm format` / `pnpm format:check` - Prettier
- `pnpm type:check` - TypeScript 타입 체크

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

## 디렉토리 구조

`app/`은 라우팅 전용, 비즈니스 로직은 `features/`에 배치

```
src/
├── app/                          # 라우팅 전용 (page, layout, loading, error)
│   ├── layout.tsx                # 루트 레이아웃
│   ├── not-found.tsx
│   ├── (auth)/                   # 인증 Route Group (별도 레이아웃)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   └── register/
│   └── (main)/                   # 메인 Route Group (공통 네비게이션)
│       ├── layout.tsx
│       ├── page.tsx              # 메인 홈
│       ├── timeline/
│       │   ├── page.tsx
│       │   └── [date]/
│       ├── issues/
│       │   ├── page.tsx
│       │   └── [id]/
│       ├── community/
│       │   ├── page.tsx
│       │   ├── write/
│       │   └── [id]/
│       ├── search/
│       ├── tracking/
│       └── mypage/
│           ├── page.tsx
│           └── edit/
│
├── features/                     # 기능별 모듈
│   ├── timeline/
│   │   ├── components/           # 타임라인 전용 컴포넌트
│   │   ├── types/                # 타임라인 타입
│   │   ├── services/             # API 호출, 데이터 변환
│   │   └── hooks/                # 타임라인 전용 훅
│   ├── issues/
│   ├── community/
│   ├── search/
│   ├── tracking/
│   └── auth/
│
├── shared/                       # 공유 모듈
│   ├── components/               # 공통 UI (Button, Card, Modal, Filter...)
│   ├── hooks/                    # 공통 훅 (useDebounce, useInfiniteScroll...)
│   ├── types/                    # 공통 타입 (Tag, Source, Pagination...)
│   ├── utils/                    # 유틸리티 (formatDate, cn...)
│   └── lib/                      # 외부 연동 (API 클라이언트, auth 헬퍼...)
│
└── widgets/                      # 조합형 UI 블록 (메인 페이지 섹션 등)
```

### 네이밍 규칙

- `app/` 내부: Next.js 파일 컨벤션만 (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)
- 컴포넌트 파일: PascalCase (`EventCard.tsx`, `IssueFilter.tsx`)
- 유틸리티/훅: camelCase (`formatDate.ts`, `useDebounce.ts`)
- 배럴 파일: `index.ts`로 re-export

## 아키텍처 원칙

- **`app/`은 라우팅 전용**: page/layout에서는 feature 컴포넌트를 import하여 조합만 수행
- **Server Component 우선**: 데이터 페칭이 필요한 페이지/레이아웃은 Server Component로 구현
- **Client Component 최소화**: 인터랙션이 필요한 컴포넌트만 `"use client"` 선언
- **Feature-based 구조**: 각 기능(feature)은 자체 components, types, services, hooks 보유
- **Route Group 활용**: `(auth)`/`(main)`으로 레이아웃 분리, URL에 영향 없음
- **공통 필터 체계**: 기간, 분야, 지역, 중요도, 상태 필터는 `shared/types`에서 관리

## 참고 문서

- `docs/PRD.md` - 상세 제품 요구사항
