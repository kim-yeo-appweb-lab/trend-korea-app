# 트렌드 코리아 프론트엔드 PRD

> 상태: 확정 | 작성일: 2026-03-09 | 코드베이스 대조 완료

> **참고**: 어드민 기능은 독립 프로젝트 `trend-korea-admin`으로 분리되었습니다.
> 이 PRD는 사용자 프론트엔드(`trend-korea-app`)만 다룹니다.
> 어드민 명세: [`trend-korea-admin/docs/PRD.md`](../../trend-korea-admin/docs/PRD.md)

---

## 1. 제품 정의 (WHY)

### 1.1 한 줄 정의

대한민국 사건/이슈를 시간순으로 기록하고 지속 추적하는 정보 아카이브 서비스의 **웹 프론트엔드**

### 1.2 해결하는 문제

- 뉴스가 여러 매체에 흩어져 있어 하나의 사건을 시간순으로 파악하기 어렵다
- 한 번 보도된 사건의 후속 경과를 추적하려면 직접 검색해야 한다
- 사건에 대한 맥락 있는 토론 공간이 부족하다

### 1.3 핵심 가치

| 가치        | 사용자 경험 관점                                            | 측정 지표             |
| ----------- | ----------------------------------------------------------- | --------------------- |
| 기록        | 사용자가 일자별로 정리된 사건을 시간순으로 탐색할 수 있다   | 일평균 등록 사건 수   |
| 추적        | 사용자가 관심 이슈의 상태 변화를 놓치지 않고 확인할 수 있다 | 이슈당 평균 트리거 수 |
| 참여        | 사용자가 커뮤니티에서 맥락 있는 토론에 참여할 수 있다       | DAU, 게시글/댓글 수   |
| 한눈에 보기 | 사용자가 메인에서 속보/트렌드/지표를 빠르게 파악할 수 있다  | 메인 페이지 체류 시간 |

### 1.4 성공 지표

| 지표                    | 목표     | 측정 방법                           |
| ----------------------- | -------- | ----------------------------------- |
| 일간 활성 사용자 (DAU)  | 1,000+   | 서버 로그 기반 고유 사용자 수       |
| 이슈 추적 등록률        | 30%+     | 로그인 사용자 중 1개 이상 추적 비율 |
| 커뮤니티 게시글/댓글 수 | 50건/일+ | posts, comments 테이블 일별 집계    |
| 메인 페이지 이탈률      | < 40%    | 메인 진입 후 다른 페이지 이동 비율  |

---

## 2. 페르소나

### 2.1 뉴스 소비자 -- 김민수 (29세, 직장인)

- **맥락**: 출퇴근 시간에 시사 이슈를 훑어보지만, 여러 뉴스 앱을 돌아다니며 파편화된 정보를 소비한다
- **니즈**: 흩어진 뉴스를 한 곳에서 시간순으로 파악하고 싶다
- **서비스 숙련도**: 중급
- **핵심 동기**: "오늘 무슨 일이 있었는지 5분 안에 파악하고 싶다"
- **주요 사용 페이지**: 메인, 타임라인, 검색

### 2.2 이슈 추적자 -- 이수진 (34세, 프리랜서 기자)

- **맥락**: 특정 사건의 경과를 지속적으로 추적하며, 후속 보도 시점을 놓치지 않아야 한다
- **니즈**: 관심 이슈에 새로운 업데이트가 생기면 즉시 알고 싶다
- **서비스 숙련도**: 고급
- **핵심 동기**: "관심 이슈의 상태 변화를 놓치지 않고 싶다"
- **주요 사용 페이지**: 이슈 추적, 내 추적, 타임라인

### 2.3 토론 참여자 -- 박지훈 (26세, 대학원생)

- **맥락**: 사회 이슈에 관심이 많고, 맥락 있는 토론에 참여하고 싶다
- **니즈**: 사건/이슈에 대해 의견을 나눌 수 있는 커뮤니티
- **서비스 숙련도**: 중급
- **핵심 동기**: "뉴스 댓글이 아닌 맥락 있는 토론 공간이 필요하다"
- **주요 사용 페이지**: 커뮤니티, 이슈 추적, 검색

---

## 3. 메인 시나리오 (HOW)

### 시나리오 A: 오늘의 사건 파악 (김민수)

1. 민수가 출근길에 트렌드 코리아 메인 페이지에 접속한다
2. 속보 섹션에서 최신 사건/트리거 10건을 훑어본다
3. 관심 있는 사건을 탭하여 상세 모달에서 출처와 요약을 확인한다
4. 타임라인 페이지로 이동하여 어제부터 오늘까지의 사건을 시간순으로 탐색한다

### 시나리오 B: 이슈 추적 (이수진)

1. 수진이 이슈 추적 페이지에서 "진행중" 필터로 활성 이슈를 확인한다
2. 관심 이슈의 상세 페이지에서 업데이트 타임라인을 확인한다
3. "추적" 버튼을 눌러 해당 이슈를 관심 목록에 등록한다
4. 내 추적 페이지에서 NEW 뱃지가 달린 업데이트를 확인한다

### 시나리오 C: 커뮤니티 토론 참여 (박지훈)

1. 지훈이 커뮤니티 페이지에서 "핫" 탭을 눌러 인기 게시물을 확인한다
2. 관심 있는 게시글의 상세 페이지에서 댓글 트리를 읽는다
3. 댓글을 작성하고 다른 댓글에 좋아요를 누른다
4. 직접 글을 작성하여 자신의 의견을 공유한다

---

## 4. 도메인 모델

### 4.1 프론트엔드 타입 정의

타입은 각 feature의 `model/types.ts`에 정의되며, 공통 타입은 `shared/types/`에 위치한다.

#### 공통 타입 (`shared/types/`)

```ts
// common.ts
type Tag = { id: string; name: string; type: "category" | "region"; slug: string }
type Source = { url: string; title: string; publisher: string; publishedAt: string }

// filter.ts
type PeriodFilter = "all" | "1w" | "1m" | "3m" | "custom"
type CategoryTag = "정치" | "사회" | "사법" | "재난" | "경제" | "노동" | "외교안보" | "문화"
type RegionTag = "전국" | "서울" | "경기" | "인천" | ... (18개 지역)

// api.ts
type ApiSuccessResponse<T> = { success: true; data: T; message: string; timestamp: string }
type ApiErrorResponse = { success: false; error: { code: string; message: string; details: {...} }; timestamp: string }
type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
```

#### 도메인 타입 소유권 매핑

| 타입                                | 소유 Feature | 파일 경로                           |
| ----------------------------------- | ------------ | ----------------------------------- |
| `Event`                             | `timeline`   | `features/timeline/model/types.ts`  |
| `Issue`, `Trigger`                  | `issues`     | `features/issues/model/types.ts`    |
| `Post`, `Comment`                   | `community`  | `features/community/model/types.ts` |
| `User`                              | `auth`       | `features/auth/model/types.ts`      |
| `SocialProvider`                    | `auth`       | `features/auth/model/types.ts`      |
| `Tag`, `Source`                     | `shared`     | `shared/types/common.ts`            |
| `SearchResultItem`                  | `search`     | `features/search/model/types.ts`    |
| `TrackingTab`, `TrackingSortOption` | `tracking`   | `features/tracking/model/types.ts`  |
| 메인 섹션 데이터                    | `home`       | `features/home/model/types.ts`      |

> **주의**: `mypage` feature(`features/mypage/model/types.ts`)에서 `SocialProvider`를 독립적으로 재정의하고 있다.
> `auth`의 정의와 동일하지만 중복이므로, shared 또는 auth에서 import하는 방식으로 리팩터링 권장.

### 4.2 상태 정의

**이슈 상태 (IssueStatus)**

| 상태     | 코드         | UI 색상 | 설명                |
| -------- | ------------ | ------- | ------------------- |
| 진행중   | `ongoing`    | red     | 현재 진행 중인 이슈 |
| 종결     | `closed`     | green   | 마무리된 이슈       |
| 재점화   | `reignited`  | yellow  | 종결 후 재부상      |
| 확인필요 | `unverified` | gray    | 사실 확인 필요      |

**사건 검증 상태 (VerificationStatus)**

| 상태     | 코드         | 설명                  |
| -------- | ------------ | --------------------- |
| 확인됨   | `verified`   | 출처로 사실 확인 완료 |
| 확인필요 | `unverified` | 확인 대기             |

**사건 중요도 (Importance)**

| 등급 | 코드     |
| ---- | -------- |
| 높음 | `high`   |
| 중간 | `medium` |
| 낮음 | `low`    |

**트리거 유형 (TriggerType)**

| 유형     | 코드            |
| -------- | --------------- |
| 기사     | `article`       |
| 판결     | `ruling`        |
| 공식발표 | `announcement`  |
| 정정     | `correction`    |
| 상태변경 | `status_change` |

---

## 5. 정보 구조 (IA) 및 라우트

### 5.1 Route Group 구조

```
src/app/
├── layout.tsx                          # 루트 레이아웃
├── not-found.tsx                       # 404 페이지
├── (auth)/                             # 인증 라우트 그룹 (Header/Footer 없음)
│   ├── layout.tsx                      # 인증 전용 레이아웃
│   ├── login/page.tsx                  # /login
│   └── register/page.tsx              # /register
├── (main)/                             # 메인 라우트 그룹 (Header/Footer 포함)
│   ├── layout.tsx                      # Header + Footer 레이아웃
│   ├── page.tsx                        # / (홈)
│   ├── timeline/
│   │   ├── page.tsx                    # /timeline
│   │   └── [date]/page.tsx            # /timeline/:date
│   ├── issues/
│   │   ├── page.tsx                    # /issues
│   │   └── [id]/page.tsx              # /issues/:id
│   ├── community/
│   │   ├── page.tsx                    # /community
│   │   ├── write/page.tsx             # /community/write
│   │   └── [id]/
│   │       ├── page.tsx               # /community/:id
│   │       └── edit/page.tsx          # /community/:id/edit
│   ├── search/page.tsx                # /search, /search?q=
│   ├── tracking/page.tsx              # /tracking
│   └── mypage/
│       ├── page.tsx                    # /mypage
│       └── edit/page.tsx              # /mypage/edit
└── api/                               # Next.js API Route (BFF 프록시)
    ├── auth/
    │   ├── login/route.ts
    │   ├── logout/route.ts
    │   ├── me/route.ts
    │   ├── refresh/route.ts
    │   └── register/route.ts
    ├── posts/
    │   ├── route.ts
    │   └── [postId]/
    │       ├── route.ts
    │       ├── comments/route.ts
    │       └── like/route.ts
    ├── comments/
    │   └── [commentId]/
    │       ├── route.ts
    │       └── like/route.ts
    └── tags/route.ts
```

### 5.2 전체 라우트 맵

| 경로                  | 페이지명           | 인증 필요 | Feature 모듈 |
| --------------------- | ------------------ | --------- | ------------ |
| `/`                   | 메인 (홈)          | X         | `home`       |
| `/timeline`           | 타임라인           | X         | `timeline`   |
| `/timeline/:date`     | 특정 날짜 타임라인 | X         | `timeline`   |
| `/issues`             | 이슈 추적 목록     | X         | `issues`     |
| `/issues/:id`         | 이슈 상세          | X         | `issues`     |
| `/community`          | 커뮤니티           | X         | `community`  |
| `/community/write`    | 글쓰기             | O         | `community`  |
| `/community/:id`      | 게시글 상세        | X         | `community`  |
| `/community/:id/edit` | 게시글 수정        | O         | `community`  |
| `/search`             | 검색               | X         | `search`     |
| `/tracking`           | 내 추적            | O         | `tracking`   |
| `/mypage`             | MY 페이지          | O         | `mypage`     |
| `/mypage/edit`        | 회원 정보 수정     | O         | `mypage`     |
| `/login`              | 로그인             | X         | `auth`       |
| `/register`           | 회원가입           | X         | `auth`       |

### 5.3 페이지 간 연결 구조

```
메인 ──> 타임라인 ──> 사건 상세 모달 ──> 관련 이슈 상세
  │                                        ↑
  ├──> 이슈 추적 ──> 이슈 상세 ──> 관련 사건
  │
  ├──> 커뮤니티 ──> 게시글 상세 ──> 관련 태그
  │
  ├──> 검색 ──> 사건/이슈/커뮤니티 결과
  │
  ├──> 내 추적 ──> 저장한 사건/추적 이슈 상세
  │
  └──> MY 페이지 ──> 회원 정보 수정
```

### 5.4 네비게이션 플로우

**Header 네비게이션 (공통)**:

- 로고 → `/` (홈)
- 타임라인 → `/timeline`
- 이슈 추적 → `/issues`
- 커뮤니티 → `/community`
- 검색 아이콘 → `/search`
- 로그인/프로필 → `/login` 또는 `/mypage`

**인증 가드 리다이렉트**:

- 비로그인 상태에서 인증 필요 페이지 접근 시 → `/login?redirect={원래경로}`
- 로그인 성공 후 → `redirect` 파라미터 경로 또는 `/`

---

## 6. 페이지별 기능 요구사항 (WHAT - MVP Scope)

### 6.1 메인 페이지 (`/`)

```
Requirement: 사용자가 메인 페이지에서 서비스의 핵심 정보를 한눈에 파악할 수 있다
├─ Feature: 타임라인 미니맵 (FR-M2) — P0
├─ Feature: 속보 피드 (FR-M1) — P0
├─ Feature: 커뮤니티 핫 게시물 (FR-M3) — P0
├─ Feature: 실시간 검색순위 (FR-M4) — P0
├─ Feature: 대한민국 트렌드 (FR-M5) — P0
├─ Feature: 주요 뉴스 (FR-M6) — P0
└─ Feature: 커뮤니티 미디어 (FR-M7) — P0
```

#### Feature: 타임라인 미니맵 (FR-M2) -- P0

- **사용자 스토리**: 사용자로서 최근 7일간 사건 밀도를 시각적으로 확인하고 특정 날짜로 이동할 수 있다

| Spec ID  | 명세                                                | API 엔드포인트                      |
| -------- | --------------------------------------------------- | ----------------------------------- |
| S-HOME-1 | 사용자가 최근 7일 사건 수를 날짜별 막대/점으로 본다 | `GET /api/v1/home/timeline-minimap` |
| S-HOME-2 | 날짜 클릭 시 `/timeline/{date}` 페이지로 이동한다   | --                                  |

- **로딩 상태**: 7개 막대의 스켈레톤 UI
- **빈 상태**: "최근 7일간 등록된 사건이 없습니다"
- **에러 상태**: 재시도 버튼 포함 에러 메시지

#### Feature: 속보 피드 (FR-M1) -- P0

- **사용자 스토리**: 사용자로서 메인 페이지에서 최신 사건/트리거를 빠르게 확인할 수 있다

| Spec ID  | 명세                                                           | API 엔드포인트                   |
| -------- | -------------------------------------------------------------- | -------------------------------- |
| S-HOME-3 | 사용자가 최신 사건/트리거 10건을 시각, 제목, 1줄 요약으로 본다 | `GET /api/v1/home/breaking-news` |
| S-HOME-4 | 항목 클릭 시 사건 상세 모달 또는 이슈 상세 페이지로 이동한다   | --                               |

- **UI 컴포넌트**: `BreakingNewsSection` > `BreakingNewsItem`
- **데이터 타입**: `BreakingNewsItemData` (id, number, time, title, summary, tags, importance)

#### Feature: 커뮤니티 핫 게시물 (FR-M3) -- P0

- **사용자 스토리**: 사용자로서 최근 24시간 인기 게시물 5건을 확인할 수 있다

| Spec ID  | 명세                                                               | API 엔드포인트               |
| -------- | ------------------------------------------------------------------ | ---------------------------- |
| S-HOME-5 | 사용자가 인기 게시물 5건을 제목, 분야, 댓글 수, 작성자와 함께 본다 | `GET /api/v1/home/hot-posts` |
| S-HOME-6 | 게시물 클릭 시 `/community/{id}`로 이동한다                        | --                           |

- **UI 컴포넌트**: `HotPostsSection` > `HotPostItem`
- **데이터 타입**: `HotPostItemData` (id, number, title, category, commentCount, author, createdAt, isHot?)

#### Feature: 실시간 검색순위 (FR-M4) -- P0

- **사용자 스토리**: 사용자로서 현재 인기 검색 키워드 1~10위를 확인할 수 있다

| Spec ID  | 명세                                                          | API 엔드포인트                     |
| -------- | ------------------------------------------------------------- | ---------------------------------- |
| S-HOME-7 | 사용자가 1~10위 키워드와 순위 변동(up/down/new/steady)을 본다 | `GET /api/v1/home/search-rankings` |
| S-HOME-8 | 키워드 클릭 시 `/search?q={keyword}`로 이동한다               | --                                 |

- **UI 컴포넌트**: `SearchRankingSection` > `SearchRankingItem`
- **데이터 타입**: `SearchRankingItemData` (rank, keyword, change, changeAmount)
- **갱신 주기**: 1시간

#### Feature: 대한민국 트렌드 (FR-M5) -- P0

- **사용자 스토리**: 사용자로서 24h/7d/30d 급상승 이슈/태그를 확인할 수 있다

| Spec ID  | 명세                                                         | API 엔드포인트              |
| -------- | ------------------------------------------------------------ | --------------------------- |
| S-HOME-9 | 사용자가 기간별(24h/7d/30d) 급상승 이슈/태그 최대 5개를 본다 | `GET /api/v1/home/trending` |

- **UI 컴포넌트**: `TrendSection` > `CategoryTabs` + `TrendCard`
- **데이터 타입**: `TrendCardData` (id, rank, title, changeRate, tags, summary)

#### Feature: 주요 뉴스 (FR-M6) -- P0

| Spec ID   | 명세                                       | API 엔드포인트                   |
| --------- | ------------------------------------------ | -------------------------------- |
| S-HOME-10 | 사용자가 주요 뉴스 요약을 카드 형태로 본다 | `GET /api/v1/home/featured-news` |

- **UI 컴포넌트**: `FeaturedNewsSection` > `FeaturedNewsCard`
- **데이터 타입**: `FeaturedNewsCardData` (id, author, authorImage, title, summary, imageUrl, createdAt)

#### Feature: 커뮤니티 미디어 (FR-M7) -- P0

| Spec ID   | 명세                                             | API 엔드포인트                     |
| --------- | ------------------------------------------------ | ---------------------------------- |
| S-HOME-11 | 사용자가 커뮤니티 미디어 콘텐츠를 확인할 수 있다 | `GET /api/v1/home/community-media` |

- **UI 컴포넌트**: `CommunityMediaSection` > `CommunityMediaCard`
- **데이터 타입**: `CommunityMediaCardData` (id, title, imageUrl, viewCount, createdAt)

**Userflow (메인 페이지)**:

1. 사용자가 `/`에 접속한다
2. 7개 섹션이 순서대로 렌더링된다 (각 섹션은 독립적으로 데이터를 페칭한다)
3. 각 섹션에서 항목을 클릭하면 해당 상세 페이지/모달로 이동한다
4. 타임라인 미니맵에서 날짜를 클릭하면 해당 날짜의 타임라인으로 이동한다

---

### 6.2 타임라인 페이지 (`/timeline`)

```
Requirement: 사용자가 일자별 사건을 시간순으로 탐색하고 상세 정보를 확인할 수 있다
├─ Feature: 날짜 선택기 (FR-T1) — P0
├─ Feature: 필터 (FR-T2) — P0
├─ Feature: 정렬 (FR-T3) — P0
├─ Feature: 사건 카드 (FR-T4) — P0
├─ Feature: 무한 스크롤 (FR-T5) — P0
└─ Feature: 사건 상세 모달 (FR-T6) — P0
```

#### Feature: 날짜 선택기 (FR-T1) -- P0

- **사용자 스토리**: 사용자로서 달력에서 특정 날짜를 선택하여 해당 일의 사건을 볼 수 있다

| Spec ID | 명세                                                  | 비고                     |
| ------- | ----------------------------------------------------- | ------------------------ |
| S-TL-1  | 사용자가 달력 모달을 열어 날짜를 선택한다             | 사건 존재 일자에 점 표시 |
| S-TL-2  | "오늘" 버튼으로 현재 날짜로 즉시 이동한다             | --                       |
| S-TL-3  | 날짜 선택 시 URL이 `/timeline/{date}` 형태로 변경된다 | YYYY-MM-DD 포맷          |

- **UI 컴포넌트**: `TimelineDatePicker`, `TimelineDateHeader`
- **상태 관리**: URL 파라미터 기반 (date)

#### Feature: 필터 (FR-T2) -- P0

- **사용자 스토리**: 사용자로서 분야/지역/중요도로 사건을 필터링할 수 있다

| Spec ID | 명세                                                                    | API 엔드포인트                   |
| ------- | ----------------------------------------------------------------------- | -------------------------------- |
| S-TL-4  | 사용자가 분야(정치/사회/사법/재난/경제/노동/외교안보/문화)로 필터링한다 | `GET /api/v1/events?tag_ids=`    |
| S-TL-5  | 사용자가 지역(전국/서울/경기/... 18개 지역)으로 필터링한다              | `GET /api/v1/events?tag_ids=`    |
| S-TL-6  | 사용자가 중요도(전체/높음/중간/낮음)로 필터링한다                       | `GET /api/v1/events?importance=` |

- **UI 컴포넌트**: `TimelineFilter`
- **상태 타입**: `TimelineFilterState { category: string; region: string; importance: string }`

#### Feature: 정렬 (FR-T3) -- P0

- **사용자 스토리**: 사용자로서 시간순 또는 중요도순으로 사건을 정렬할 수 있다

| Spec ID | 명세                                             | API 엔드포인트                                    |
| ------- | ------------------------------------------------ | ------------------------------------------------- |
| S-TL-7  | 사용자가 시간순(기본) 또는 중요도순으로 정렬한다 | `GET /api/v1/events?sort=occurred_at\|importance` |

- **UI 컴포넌트**: `TimelineSortSelect`
- **상태 타입**: `TimelineSortOption = "latest" | "importance"`

#### Feature: 사건 카드 (FR-T4) -- P0

- **사용자 스토리**: 사용자로서 사건의 핵심 정보를 카드 형태로 확인할 수 있다

| Spec ID | 명세                                                                   | 비고                            |
| ------- | ---------------------------------------------------------------------- | ------------------------------- |
| S-TL-8  | 카드에 발생 시각, 제목, 요약, 태그, 출처 수, 검증 상태 뱃지를 표시한다 | --                              |
| S-TL-9  | 사용자가 저장 버튼으로 사건을 북마크한다 (로그인 필요)                 | `POST /api/v1/events/{id}/save` |
| S-TL-10 | 사용자가 공유 버튼으로 링크를 복사한다                                 | 클립보드 API                    |

- **UI 컴포넌트**: `TimelineEventCard`
- **데이터 타입**: `Event` (id, occurredAt, title, summary, tags, sources, importance, verificationStatus, relatedIssueIds)
- **뱃지 매핑**: `features/timeline/utils/badgeMapping.ts`

#### Feature: 무한 스크롤 (FR-T5) -- P0

- **사용자 스토리**: 사용자로서 스크롤하면 과거 사건이 자동으로 추가 로딩된다

| Spec ID | 명세                                                        | API 엔드포인트                      |
| ------- | ----------------------------------------------------------- | ----------------------------------- |
| S-TL-11 | 사용자가 스크롤하면 일주일 단위로 과거 사건이 추가 로딩된다 | `GET /api/v1/events?cursor=&limit=` |

- **구현**: React Query `useInfiniteQuery` + IntersectionObserver
- **로딩 상태**: 하단 스피너
- **빈 상태**: "해당 날짜에 등록된 사건이 없습니다"

#### Feature: 사건 상세 모달 (FR-T6) -- P0

- **사용자 스토리**: 사용자로서 사건을 클릭하면 상세 정보를 모달에서 확인할 수 있다

| Spec ID | 명세                                                                  | API 엔드포인트            |
| ------- | --------------------------------------------------------------------- | ------------------------- |
| S-TL-12 | 사용자가 사건 클릭 시 전체 내용, 출처 링크, 관련 이슈를 모달에서 본다 | `GET /api/v1/events/{id}` |
| S-TL-13 | 관련 이슈 클릭 시 `/issues/{id}` 페이지로 이동한다                    | --                        |

- **UI 컴포넌트**: `TimelineEventDetail`

**Userflow (타임라인)**:

1. 사용자가 `/timeline` 페이지에 진입한다
2. 오늘 날짜의 사건 목록이 시간순으로 표시된다
3. 사용자가 필터/정렬을 조정하거나 달력에서 날짜를 선택한다
4. 사건 카드를 클릭하면 상세 모달이 열린다
5. 모달에서 관련 이슈를 클릭하면 이슈 상세 페이지로 이동한다
6. 아래로 스크롤하면 이전 주 사건이 로딩된다

---

### 6.3 이슈 추적 페이지 (`/issues`)

```
Requirement: 사용자가 사회 이슈의 경과를 지속 추적하고 관심 이슈를 등록할 수 있다
├─ Feature: 이슈 목록/필터 (FR-I1) — P0
├─ Feature: 이슈 정렬 (FR-I2) — P0
├─ Feature: 이슈 카드 (FR-I3) — P0
├─ Feature: 이슈 상세 (FR-I4) — P0
└─ Feature: 추적 등록/해제 (FR-I5) — P0
```

#### Feature: 이슈 목록/필터 (FR-I1) -- P0

- **사용자 스토리**: 사용자로서 이슈를 상태/분야/기간으로 필터링할 수 있다

| Spec ID | 명세                                                            | API 엔드포인트                |
| ------- | --------------------------------------------------------------- | ----------------------------- |
| S-IS-1  | 사용자가 상태(ongoing/closed/reignited/unverified)로 필터링한다 | `GET /api/v1/issues?status=`  |
| S-IS-2  | 사용자가 분야(태그)로 필터링한다                                | `GET /api/v1/issues?tag_ids=` |
| S-IS-3  | 사용자가 기간(전체/1주일/1개월/3개월)으로 필터링한다            | `GET /api/v1/issues?period=`  |

- **UI 컴포넌트**: `IssueFilter`
- **상태 타입**: `IssueFilterState { status: string; category: string; period: string }`

#### Feature: 이슈 정렬 (FR-I2) -- P0

- **사용자 스토리**: 사용자로서 이슈를 업데이트순/추적자순/중요도순으로 정렬할 수 있다

| Spec ID | 명세                                                          | API 엔드포인트                                             |
| ------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| S-IS-4  | 사용자가 최신 업데이트순(기본)/추적자순/중요도순으로 정렬한다 | `GET /api/v1/issues?sort=latest_trigger_at\|tracker_count` |

- **UI 컴포넌트**: `IssueSortSelect`
- **상태 타입**: `IssueSortOption = "latest" | "trackers" | "importance"`

#### Feature: 이슈 카드 (FR-I3) -- P0

- **사용자 스토리**: 사용자로서 이슈의 핵심 정보를 카드 형태로 확인할 수 있다

| Spec ID | 명세                                                                     | 비고 |
| ------- | ------------------------------------------------------------------------ | ---- |
| S-IS-5  | 카드에 상태 아이콘, 제목, 최근 업데이트 요약, 태그, 추적자 수를 표시한다 | --   |
| S-IS-6  | "추적" / "상세보기" 버튼을 표시한다                                      | --   |

- **UI 컴포넌트**: `IssueCard`
- **뱃지 매핑**: `features/issues/utils/badgeMapping.ts`

#### Feature: 이슈 상세 (FR-I4) -- P0

- **사용자 스토리**: 사용자로서 이슈의 전체 배경, 업데이트 타임라인, 관련 사건, 출처를 확인할 수 있다

| Spec ID | 명세                                                  | API 엔드포인트                                         |
| ------- | ----------------------------------------------------- | ------------------------------------------------------ |
| S-IS-7  | 사용자가 이슈 개요(제목, 설명, 상태, 태그)를 확인한다 | `GET /api/v1/issues/{id}`                              |
| S-IS-8  | 사용자가 트리거 타임라인을 시간순으로 확인한다        | `GET /api/v1/issues/{id}/triggers`                     |
| S-IS-9  | 사용자가 관련 사건 목록을 확인한다                    | `GET /api/v1/issues/{id}/timeline`                     |
| S-IS-10 | 사용자가 출처 목록을 확인하고 원문 링크로 이동한다    | `GET /api/v1/sources?entity_type=issue&entity_id={id}` |

- **UI 컴포넌트**: `IssueDetailOverview`, `IssueDetailTimeline` (트리거), `IssueDetailRelated` (관련 사건)
- **공통 컴포넌트**: `SourceLink` (shared/ui)

#### Feature: 추적 등록/해제 (FR-I5) -- P0

- **사용자 스토리**: 로그인한 사용자로서 관심 이슈를 추적 목록에 추가/제거할 수 있다

| Spec ID | 명세                                                           | API 엔드포인트                     |
| ------- | -------------------------------------------------------------- | ---------------------------------- |
| S-IS-11 | 사용자가 "추적" 버튼을 눌러 이슈를 추적 등록한다 (로그인 필요) | `POST /api/v1/issues/{id}/track`   |
| S-IS-12 | 사용자가 "추적 해제" 버튼을 눌러 추적을 취소한다               | `DELETE /api/v1/issues/{id}/track` |
| S-IS-13 | 추적 등록/해제 시 `trackerCount`가 실시간 반영된다             | Optimistic update                  |

- **UI 컴포넌트**: `IssueTrackButton`
- **엣지 케이스**: 비로그인 상태에서 추적 시도 시 → 로그인 페이지로 리다이렉트

**Userflow (이슈 추적)**:

1. 사용자가 `/issues` 페이지에 진입한다
2. 이슈 목록이 최신 업데이트순으로 표시된다
3. 사용자가 상태/분야/기간 필터를 조정한다
4. 이슈 카드의 "상세보기"를 클릭하면 `/issues/{id}`로 이동한다
5. 상세 페이지에서 트리거 타임라인과 관련 사건을 확인한다
6. "추적" 버튼을 눌러 관심 이슈로 등록한다

---

### 6.4 커뮤니티 페이지 (`/community`)

```
Requirement: 사용자가 사건/이슈에 대해 의견을 공유하고 토론에 참여할 수 있다
├─ Feature: 탭/정렬 (FR-C1, FR-C5) — P0
├─ Feature: 게시글 카드 (FR-C2) — P0
├─ Feature: 글쓰기 (FR-C3) — P0
├─ Feature: 게시글 상세/댓글 (FR-C4) — P0
└─ Feature: 투표/좋아요 (FR-C6) — P0
```

#### Feature: 탭/정렬 (FR-C1, FR-C5) -- P0

- **사용자 스토리**: 사용자로서 탭과 정렬 기준으로 게시글을 분류하여 볼 수 있다

| Spec ID | 명세                                                            | API 엔드포인트                                                 |
| ------- | --------------------------------------------------------------- | -------------------------------------------------------------- |
| S-CM-1  | 사용자가 최신/인기(24h 추천)/핫(추천+댓글 복합) 탭으로 전환한다 | `GET /api/v1/posts?tab=latest\|popular\|hot`                   |
| S-CM-2  | 사용자가 최신순/추천순/댓글 많은 순으로 정렬한다                | `GET /api/v1/posts?sort=created_at\|like_count\|comment_count` |

- **상태 타입**: `CommunityTab = "latest" | "popular" | "hot"`, `CommunitySortOption = "latest" | "popular" | "comments"`

#### Feature: 게시글 카드 (FR-C2) -- P0

| Spec ID | 명세                                                                          | 비고 |
| ------- | ----------------------------------------------------------------------------- | ---- |
| S-CM-3  | 카드에 제목, 작성자(익명 시 "익명"), 작성 시각, 추천/댓글 수, 태그를 표시한다 | --   |
| S-CM-4  | 카드 클릭 시 `/community/{id}`로 이동한다                                     | --   |

- **UI 컴포넌트**: `PostCard`, `PostList`
- **데이터 타입**: `Post`, `PostDetail` (Post 확장, `isAuthor`/`userLiked` 추가; Public API에서 `PostDetailType`으로 alias export)
- **추가 타입**: `PostListParams` (cursor, limit, tab, categories, sortBy), `VoteType = "like" | "dislike"`
- **페이지네이션**: 커서 기반 (`CursorPagination`, `PaginatedPosts`)

#### Feature: 글쓰기 (FR-C3) -- P0

- **사용자 스토리**: 로그인한 사용자로서 제목, 본문, 태그를 입력하여 게시글을 작성할 수 있다

| Spec ID | 명세                                                                                      | API 엔드포인트              |
| ------- | ----------------------------------------------------------------------------------------- | --------------------------- |
| S-CM-5  | 사용자가 제목(필수, 100자), 본문(마크다운, 10000자), 태그(최대 3개), 익명 여부를 입력한다 | `POST /api/v1/posts`        |
| S-CM-6  | 사용자가 작성한 글을 수정한다                                                             | `PATCH /api/v1/posts/{id}`  |
| S-CM-7  | 사용자가 작성한 글을 삭제한다                                                             | `DELETE /api/v1/posts/{id}` |

- **UI 컴포넌트**: `PostWriteForm`, `TagSelect` (태그 목록 조회: `useTags` 훅, `tagQueries`)
- **폼 검증 (Zod)**: `createPostSchema`, `updatePostSchema`
  - 제목: 1~100자 필수
  - 본문: 1~10,000자 필수
  - 태그 ID 배열(`tagIds`): 최대 3개
  - 익명: boolean
- **엣지 케이스**:
  - 비로그인 상태에서 `/community/write` 접근 → 로그인 페이지로 리다이렉트
  - 다른 사용자의 글 수정/삭제 시도 → 403 Forbidden
  - 네트워크 에러 시 작성 중인 내용 유지 (상태 보존)

#### Feature: 게시글 상세/댓글 (FR-C4) -- P0

- **사용자 스토리**: 사용자로서 게시글 전체 내용과 댓글/대댓글 트리를 확인하고, 댓글을 작성할 수 있다

| Spec ID | 명세                                                     | API 엔드포인트                     |
| ------- | -------------------------------------------------------- | ---------------------------------- |
| S-CM-8  | 사용자가 게시글 전체 내용을 마크다운 렌더링으로 확인한다 | `GET /api/v1/posts/{id}`           |
| S-CM-9  | 사용자가 댓글/대댓글을 트리 구조로 확인한다              | `GET /api/v1/posts/{id}/comments`  |
| S-CM-10 | 사용자가 댓글을 작성한다 (대댓글은 `parentId` 지정)      | `POST /api/v1/posts/{id}/comments` |
| S-CM-11 | 사용자가 댓글을 수정한다                                 | `PATCH /api/v1/comments/{id}`      |
| S-CM-12 | 사용자가 댓글을 삭제한다                                 | `DELETE /api/v1/comments/{id}`     |

- **UI 컴포넌트**: `PostDetail`, `CommentTree`, `CommentItem`, `CommentForm`, `PostActions`
- **폼 검증 (Zod)**: `createCommentSchema` (content: 필수, parentId: nullable), `updateCommentSchema`

#### Feature: 투표/좋아요 (FR-C6) -- P0

- **사용자 스토리**: 로그인한 사용자로서 게시글에 추천/비추천, 댓글에 좋아요를 할 수 있다

| Spec ID | 명세                                                        | API 엔드포인트                           |
| ------- | ----------------------------------------------------------- | ---------------------------------------- |
| S-CM-13 | 사용자가 게시글에 추천/비추천을 한다 (중복 투표 불가, 토글) | `POST /api/v1/posts/{id}/like`           |
| S-CM-14 | 사용자가 댓글에 좋아요를 누른다/취소한다                    | `POST/DELETE /api/v1/comments/{id}/like` |

- **응답 타입**: `VoteResponse`, `CommentLikeResponse`
- **Optimistic update**: 투표/좋아요 시 즉시 UI 반영, 실패 시 롤백

**Userflow (커뮤니티)**:

1. 사용자가 `/community` 페이지에 진입한다
2. "최신" 탭의 게시글 목록이 표시된다
3. 탭(최신/인기/핫)을 전환하거나 정렬 기준을 변경한다
4. 게시글 클릭 시 상세 페이지(`/community/{id}`)로 이동한다
5. 상세 페이지에서 댓글 트리를 확인하고 댓글을 작성한다
6. 추천/비추천 버튼을 눌러 투표한다
7. "글쓰기" 버튼으로 `/community/write`로 이동하여 글을 작성한다

---

### 6.5 검색 페이지 (`/search`)

```
Requirement: 사용자가 키워드로 사건/이슈/게시글을 통합 검색할 수 있다
├─ Feature: 검색창/자동완성 (FR-S1) — P0
├─ Feature: 고급 필터 (FR-S2) — P0
├─ Feature: 결과 탭 (FR-S3) — P0
├─ Feature: 검색 결과 카드 (FR-S4) — P0
└─ Feature: 결과 정렬 (FR-S5) — P0
```

#### Feature: 검색창/자동완성 (FR-S1) -- P0

- **사용자 스토리**: 사용자로서 검색어를 입력하면 자동완성 제안을 받고, 최근 검색어를 관리할 수 있다

| Spec ID | 명세                                                    | API/저장소                                 |
| ------- | ------------------------------------------------------- | ------------------------------------------ |
| S-SR-1  | 사용자가 검색어를 입력하면 자동완성 제안을 받는다       | 프론트엔드 디바운스 → `GET /api/v1/search` |
| S-SR-2  | 사용자가 최근 검색어 10개를 확인하고 개별/전체 삭제한다 | 로컬스토리지                               |

- **UI 컴포넌트**: `SearchBar`, `RecentSearchList`
- **디바운스**: 300ms

#### Feature: 고급 필터 (FR-S2) -- P0

| Spec ID | 명세                                                | API 엔드포인트                           |
| ------- | --------------------------------------------------- | ---------------------------------------- |
| S-SR-3  | 사용자가 기간/분야/지역/중요도 고급 필터를 적용한다 | `GET /api/v1/search?q=&period=&tag_ids=` |

- **UI 컴포넌트**: `SearchFilter`

#### Feature: 결과 탭 (FR-S3) -- P0

| Spec ID | 명세                                                         | API 엔드포인트                                   |
| ------- | ------------------------------------------------------------ | ------------------------------------------------ |
| S-SR-4  | 사용자가 전체/사건/이슈/커뮤니티 탭으로 결과를 분류하여 본다 | `GET /api/v1/search/events`, `/issues`, `/posts` |

- **UI 컴포넌트**: `SearchResultTabs`
- **상태 타입**: `SearchTab = "all" | "events" | "issues" | "community"`

#### Feature: 검색 결과 카드 (FR-S4) -- P0

| Spec ID | 명세                                                     | 비고 |
| ------- | -------------------------------------------------------- | ---- |
| S-SR-5  | 검색 결과에 제목 하이라이트, 날짜, 요약, 태그를 표시한다 | --   |

- **UI 컴포넌트**: `SearchResultCard`, `SearchResultList`
- **데이터 타입**: `SearchResultItem { id, type: "event" | "issue" | "post", title, summary, date, tags: string[] }` (주: 다른 도메인은 `Tag[]`이지만 검색 결과는 문자열 배열)

#### Feature: 결과 정렬 (FR-S5) -- P0

| Spec ID | 명세                                               | API 엔드포인트                                        |
| ------- | -------------------------------------------------- | ----------------------------------------------------- |
| S-SR-6  | 사용자가 관련도순(기본)/최신순/인기순으로 정렬한다 | `GET /api/v1/search?sort=relevance\|date\|popularity` |

- **상태 타입**: `SearchSortOption = "relevance" | "latest" | "popular"`

**Userflow (검색)**:

1. 사용자가 `/search` 페이지에 진입하거나 Header 검색 아이콘을 클릭한다
2. 검색창에 포커스가 잡히면 최근 검색어 10개가 표시된다
3. 검색어 입력 시 300ms 디바운스 후 자동완성 제안이 표시된다
4. Enter 또는 제안 클릭 시 검색이 실행되고 URL이 `/search?q={keyword}`로 변경된다
5. 결과 탭(전체/사건/이슈/커뮤니티)으로 분류하여 확인한다
6. 고급 필터로 기간/분야/지역/중요도를 추가 적용한다

---

### 6.6 내 추적 페이지 (`/tracking`)

```
Requirement: 로그인한 사용자가 추적 중인 이슈와 저장한 사건을 한 곳에서 관리할 수 있다
└─ Feature: 추적/저장 모아보기 (FR-TR1) — P0
```

#### Feature: 추적/저장 모아보기 (FR-TR1) -- P0

- **사용자 스토리**: 로그인한 사용자로서 추적 중인 이슈와 저장한 사건을 한 곳에서 관리할 수 있다

| Spec ID | 명세                                                       | API 엔드포인트                        |
| ------- | ---------------------------------------------------------- | ------------------------------------- |
| S-TR-1  | 사용자가 "추적 중인 이슈" 탭에서 추적 이슈 목록을 확인한다 | `GET /api/v1/users/me/tracked-issues` |
| S-TR-2  | 사용자가 "저장한 사건" 탭에서 저장 사건 목록을 확인한다    | `GET /api/v1/users/me/saved-events`   |
| S-TR-3  | 새 업데이트가 있는 항목에 NEW 뱃지를 표시한다              | --                                    |
| S-TR-4  | 최신 업데이트순/저장 날짜순/이름순으로 정렬한다            | 쿼리 파라미터 `sort`                  |
| S-TR-5  | 추적 중인 항목이 없으면 빈 상태 안내를 표시한다            | --                                    |

- **UI 컴포넌트**: `TrackingList`, `TrackingIssueCard`, `TrackingSavedEventCard`
- **상태 타입**: `TrackingTab = "issues" | "events"`, `TrackingSortOption = "latest" | "updated"`
- **빈 상태**: "추적 중인 항목이 없습니다. 이슈 추적 페이지에서 관심 이슈를 등록해보세요." + 이슈 추적 페이지 바로가기

**Userflow (내 추적)**:

1. 사용자가 `/tracking` 페이지에 진입한다 (비로그인 시 로그인으로 리다이렉트)
2. "추적 중인 이슈" 탭이 기본 표시된다
3. NEW 뱃지가 달린 항목을 우선 확인한다
4. 항목 클릭 시 이슈 상세 또는 사건 상세로 이동한다
5. "저장한 사건" 탭으로 전환하여 북마크한 사건을 확인한다

---

### 6.7 MY 페이지 (`/mypage`)

```
Requirement: 로그인한 사용자가 프로필과 계정을 관리할 수 있다
├─ Feature: 프로필 확인 (FR-MY1) — P0
├─ Feature: 계정 관리 (FR-MY2) — P0
├─ Feature: 활동 내역 (FR-MY3) — P0
└─ Feature: 로그아웃/탈퇴 (FR-MY4) — P0
```

#### Feature: 프로필 확인 (FR-MY1) -- P0

| Spec ID | 명세                                                       | API 엔드포인트         |
| ------- | ---------------------------------------------------------- | ---------------------- |
| S-MY-1  | 사용자가 프로필(이미지, 닉네임, 이메일, 가입일)을 확인한다 | `GET /api/v1/users/me` |

- **UI 컴포넌트**: `ProfileSection`

#### Feature: 계정 관리 (FR-MY2) -- P0

| Spec ID | 명세                                     | API 엔드포인트                                                         |
| ------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| S-MY-2  | 사용자가 닉네임/프로필 이미지를 수정한다 | `PATCH /api/v1/users/me`                                               |
| S-MY-3  | 사용자가 비밀번호를 변경한다             | `POST /api/v1/users/me/change-password`                                |
| S-MY-4  | 사용자가 SNS 계정을 연동/해제한다        | `POST /api/v1/users/me/social-connect`, `DELETE .../social-disconnect` |

- **UI 컴포넌트**: `ProfileEditForm`, `AccountSection`, `SocialLinkItem`
- **수정 페이지**: `/mypage/edit`

#### Feature: 활동 내역 (FR-MY3) -- P0

| Spec ID | 명세                                               | API 엔드포인트                  |
| ------- | -------------------------------------------------- | ------------------------------- |
| S-MY-5  | 사용자가 활동 내역(작성 게시글/댓글 수)을 확인한다 | `GET /api/v1/users/me/activity` |

#### Feature: 로그아웃/탈퇴 (FR-MY4) -- P0

| Spec ID | 명세                                                   | API 엔드포인트                 |
| ------- | ------------------------------------------------------ | ------------------------------ |
| S-MY-6  | 사용자가 로그아웃한다                                  | `POST /api/v1/auth/logout`     |
| S-MY-7  | 사용자가 회원탈퇴한다 (확인 다이얼로그 후 soft delete) | `DELETE /api/v1/auth/withdraw` |

- **UI 컴포넌트**: `AccountActions`
- **회원탈퇴 플로우**: 확인 다이얼로그 → "정말 탈퇴하시겠습니까?" → 확인 시 탈퇴 처리 → 로그인 페이지로 이동

#### Feature: 서비스 정보 (FR-MY5) -- P1

| Spec ID | 명세                                                           | 비고 |
| ------- | -------------------------------------------------------------- | ---- |
| S-MY-8  | 사용자가 공지사항, 이용약관, 개인정보처리방침, 문의를 확인한다 | --   |

- **UI 컴포넌트**: `ServiceInfoSection`

---

### 6.8 인증 (로그인/회원가입)

```
Requirement: 사용자가 이메일 또는 SNS로 가입/로그인하여 서비스를 이용할 수 있다
├─ Feature: 로그인 (FR-AUTH1) — P0
├─ Feature: 회원가입 (FR-AUTH2) — P0
└─ Feature: SNS 로그인 (FR-AUTH3) — P0
```

#### Feature: 로그인 (FR-AUTH1) -- P0

- **사용자 스토리**: 사용자로서 이메일/비밀번호로 로그인하여 서비스를 이용할 수 있다

| Spec ID  | 명세                                                       | API 엔드포인트            |
| -------- | ---------------------------------------------------------- | ------------------------- |
| S-AUTH-1 | 사용자가 이메일(실시간 형식 검증)과 비밀번호를 입력한다    | --                        |
| S-AUTH-2 | 사용자가 비밀번호 보기/숨기기를 토글한다 (눈 아이콘)       | --                        |
| S-AUTH-3 | 사용자가 로그인 버튼을 누르면 인증이 처리된다              | `POST /api/v1/auth/login` |
| S-AUTH-4 | 로그인 성공 시 redirect 파라미터 경로 또는 `/`로 이동한다  | --                        |
| S-AUTH-5 | 로그인 실패 시 에러 메시지를 표시한다 (fade-in 애니메이션) | --                        |

- **UI 컴포넌트**: `LoginForm`, `PasswordInput`
- **폼 검증 (Zod)**: `loginSchema`
  - 이메일: 필수, 이메일 형식
  - 비밀번호: 필수, 8~72자

**레이아웃**:

1. 로고 (중앙 정렬)
2. 안내 문구: "로그인하여 서비스를 이용하세요"
3. 이메일/비밀번호 입력 폼 (`autocomplete` 지원)
4. 로그인 버튼 (로딩 상태 표시, 중복 제출 방지)
5. "계정이 없으신가요? 회원가입" 링크
6. 구분선 ("또는")
7. 소셜 로그인 버튼

#### Feature: 회원가입 (FR-AUTH2) -- P0

- **사용자 스토리**: 사용자로서 닉네임/이메일/비밀번호로 회원가입할 수 있다

| Spec ID   | 명세                                                                        | API 엔드포인트               |
| --------- | --------------------------------------------------------------------------- | ---------------------------- |
| S-AUTH-6  | 사용자가 닉네임(2~20자), 이메일, 비밀번호(8~72자), 비밀번호 확인을 입력한다 | --                           |
| S-AUTH-7  | 비밀번호 강도를 시각적으로 표시한다 (프로그레스 바 + 텍스트)                | --                           |
| S-AUTH-8  | 비밀번호 불일치 시 즉시 에러 메시지를 표시한다                              | --                           |
| S-AUTH-9  | 모든 검증 통과 전까지 버튼이 disabled 상태이다                              | --                           |
| S-AUTH-10 | 사용자가 회원가입 버튼을 누르면 계정이 생성된다                             | `POST /api/v1/auth/register` |

- **UI 컴포넌트**: `RegisterForm`, `PasswordInput`, `PasswordStrengthBar`
- **폼 검증 (Zod)**: `registerSchema`
  - 닉네임: 2~20자 필수
  - 이메일: 필수, 이메일 형식
  - 비밀번호: 8~72자 필수
  - 비밀번호 확인: 비밀번호와 일치 (`.refine()`)

**비밀번호 강도 계산** (`calculatePasswordStrength` 유틸 함수, `PasswordStrength` 타입):

- 약함: 8자 미만 또는 단순 패턴
- 보통: 8~10자, 2가지 이상 조합 (대/소문자, 숫자, 특수문자 중)
- 강함: 10자 이상, 3가지 이상 조합

#### Feature: SNS 로그인 (FR-AUTH3) -- P0

| Spec ID   | 명세                                                       | API 엔드포인트                   |
| --------- | ---------------------------------------------------------- | -------------------------------- |
| S-AUTH-11 | 사용자가 카카오/네이버/구글 버튼으로 SNS 로그인을 시도한다 | `POST /api/v1/auth/social-login` |

- **UI 컴포넌트**: `SocialLoginButtons`, `AuthDivider`
- **지원 프로바이더**: `SocialProvider = "kakao" | "naver" | "google"`

**공통 UX 규칙 (인증 페이지)**:

- 포커스 시 ring 효과: `focus:ring-2 focus:ring-primary/20`
- 에러 메시지: `animate-in fade-in slide-in-from-top-1`
- 버튼 호버: `hover:scale-[1.02] active:scale-[0.98]`
- 로딩 중 버튼: `disabled` + 텍스트 변경
- 접근성: `aria-label`, `aria-invalid`, `aria-describedby`, `autocomplete`

---

## 7. 공통 시스템

### 7.1 인증/인가 (프론트엔드 관점)

| 항목           | 상세                                                                 |
| -------------- | -------------------------------------------------------------------- |
| 토큰 저장      | Access Token / Refresh Token (httpOnly 쿠키, BFF 프록시 경유)        |
| 토큰 갱신      | 401 응답 시 자동으로 `/api/auth/refresh` 호출 후 원래 요청 재시도    |
| 인증 상태 관리 | React Query로 `/api/auth/me` 캐싱                                    |
| 인증 가드      | 보호 페이지 접근 시 인증 상태 확인 → 미인증 시 로그인으로 리다이렉트 |
| 로그아웃       | 쿠키 삭제 + React Query 캐시 무효화 → `/login`으로 이동              |

**BFF (Backend For Frontend) 프록시**:

- `src/app/api/` 디렉토리에 Next.js Route Handler로 구현
- 클라이언트 → Next.js API Route → FastAPI 백엔드
- 쿠키 기반 인증 토큰 관리 (`src/shared/lib/cookies.ts`)
- 서버 사이드 API 클라이언트: `src/shared/lib/serverApiClient.ts`
- 클라이언트 사이드 API 클라이언트: `src/shared/lib/apiClient.ts` (ky 기반, prefix `/api`)

**권한 매트릭스**:

| 기능                          | guest | member |
| ----------------------------- | ----- | ------ |
| 사건/이슈/커뮤니티 조회, 검색 | O     | O      |
| 사건 저장 / 이슈 추적         | X     | O      |
| 게시글/댓글 작성              | X     | O      |
| 추천/비추천/좋아요            | X     | O      |
| 본인 게시글/댓글 수정/삭제    | X     | O      |

> admin 권한(사건/이슈/트리거 CRUD 등)은 `trend-korea-admin` 프로젝트에서 관리합니다.

### 7.2 공통 필터 체계

| 필터   | 옵션                                               | 적용 페이지               |
| ------ | -------------------------------------------------- | ------------------------- |
| 기간   | 전체 / 1주일 / 1개월 / 3개월 / 직접 입력           | 타임라인, 이슈 추적, 검색 |
| 분야   | 정치, 사회, 사법, 재난, 경제, 노동, 외교안보, 문화 | 전체                      |
| 지역   | 전국, 서울, 경기, 인천, 강원, 충북, 충남...        | 타임라인, 검색            |
| 중요도 | 전체 / 높음 / 중간 / 낮음                          | 타임라인, 검색            |
| 상태   | 진행중 / 종결 / 재점화 / 확인필요                  | 이슈 추적 전용            |

### 7.3 데이터 페칭 (React Query 패턴)

- **라이브러리**: `@tanstack/react-query` v5
- **QueryProvider**: `src/shared/lib/QueryProvider.tsx`
- **QueryClient 생성**: `src/shared/lib/makeQueryClient.ts`
- **API 클라이언트**: `ky` 기반 (`src/shared/lib/apiClient.ts`)

**패턴**:

- Query: `useQuery` (단건 조회), `useInfiniteQuery` (무한 스크롤)
- Mutation: `useMutation` + `onSuccess` 에서 `invalidateQueries`
- Optimistic Update: 추적 등록/해제, 투표/좋아요
- Query Key 네이밍: feature별 queries 파일에 정의 (`features/*/model/queries.ts`)

**구현된 React Query 훅 목록**:

| 훅                  | Feature     | 용도                        |
| ------------------- | ----------- | --------------------------- |
| `useCurrentUser`    | `auth`      | 현재 사용자 정보 조회       |
| `useLogin`          | `auth`      | 로그인 mutation             |
| `useLogout`         | `auth`      | 로그아웃 mutation           |
| `useRegister`       | `auth`      | 회원가입 mutation           |
| `usePostList`       | `community` | 게시글 목록 조회            |
| `usePostDetail`     | `community` | 게시글 상세 조회            |
| `useCreatePost`     | `community` | 게시글 작성 mutation        |
| `useUpdatePost`     | `community` | 게시글 수정 mutation        |
| `useDeletePost`     | `community` | 게시글 삭제 mutation        |
| `useComments`       | `community` | 댓글 목록 조회              |
| `useCreateComment`  | `community` | 댓글 작성 mutation          |
| `useUpdateComment`  | `community` | 댓글 수정 mutation          |
| `useDeleteComment`  | `community` | 댓글 삭제 mutation          |
| `useVotePost`       | `community` | 게시글 추천/비추천 mutation |
| `useLikeComment`    | `community` | 댓글 좋아요 mutation        |
| `useTags`           | `community` | 태그 목록 조회              |
| `useTimelineFilter` | `timeline`  | 타임라인 필터 상태 관리     |

**Query Key 팩토리**:

| 팩토리             | Feature     | 파일                                  |
| ------------------ | ----------- | ------------------------------------- |
| `authQueries`      | `auth`      | `features/auth/model/queries.ts`      |
| `communityQueries` | `community` | `features/community/model/queries.ts` |
| `tagQueries`       | `community` | `features/community/model/queries.ts` |

### 7.4 폼 검증 (Zod 스키마)

- **라이브러리**: `zod` v4 + `react-hook-form` v7 + `@hookform/resolvers`
- **패턴**: 각 feature의 `model/schemas.ts`에 Zod 스키마 정의 → `useForm` + `zodResolver` 연동

**구현된 스키마 목록**:

| 스키마                | Feature     | 검증 규칙                                   |
| --------------------- | ----------- | ------------------------------------------- |
| `loginSchema`         | `auth`      | 이메일 형식, 비밀번호 8~72자                |
| `registerSchema`      | `auth`      | 닉네임 2~20자, 이메일 형식, 비밀번호 일치   |
| `createPostSchema`    | `community` | 제목 1~100자, 본문 1~10000자, 태그 최대 3개 |
| `updatePostSchema`    | `community` | 제목/본문/태그 optional                     |
| `createCommentSchema` | `community` | content 필수, parentId nullable             |
| `updateCommentSchema` | `community` | content 필수                                |

### 7.5 에러 처리

**API 에러 응답 매핑** (`shared/types/api.ts`):

| HTTP 상태 | 처리                                           |
| --------- | ---------------------------------------------- |
| 400       | 폼 필드별 에러 메시지 표시                     |
| 401       | 토큰 갱신 시도 → 실패 시 로그인으로 리다이렉트 |
| 403       | "권한이 없습니다" 토스트/메시지                |
| 404       | 404 페이지 표시                                |
| 422       | 유효성 검증 에러 필드별 표시                   |
| 500       | "서버 오류가 발생했습니다" + 재시도 버튼       |

**에러 메시지 관리**: feature별 `model/errorMessages.ts`에 정의 (auth, community 구현 완료)

### 7.6 응답 표준 형식

```ts
// 성공
{ success: true, data: T, message: string, timestamp: string }

// 에러
{ success: false, error: { code: string, message: string, details: { errors?, fields? } }, timestamp: string }
```

---

## 8. 아키텍처

### 8.1 Features + Shared 패턴

**의존 방향**: `app → features → shared` (역방향 금지)

```
src/
├── app/                              # 라우팅 & features 조립만
│   ├── (auth)/                       # 인증 라우트 그룹
│   ├── (main)/                       # 메인 라우트 그룹
│   └── api/                          # BFF 프록시 (Next.js Route Handler)
├── features/                         # 도메인 기능 (8개 모듈)
│   ├── auth/                         # 인증: LoginForm, RegisterForm, PasswordInput, ...
│   ├── home/                         # 메인: BreakingNewsSection, TrendSection, ...
│   ├── timeline/                     # 타임라인: TimelineEventCard, TimelineFilter, ...
│   ├── issues/                       # 이슈 추적: IssueCard, IssueDetailOverview, ...
│   ├── community/                    # 커뮤니티: PostCard, PostWriteForm, CommentTree, ...
│   ├── search/                       # 검색: SearchBar, SearchResultList, ...
│   ├── tracking/                     # 내 추적: TrackingList, TrackingIssueCard, ...
│   └── mypage/                       # MY 페이지: ProfileSection, AccountSection, ...
└── shared/                           # 도메인 중립 공유
    ├── layouts/                      # Header, Footer
    ├── lib/                          # apiClient, QueryProvider, cookies, ...
    ├── ui/                           # Logo, SourceLink
    ├── utils/                        # date 포맷 유틸
    ├── types/                        # Tag, Source, ApiResponse, Filter 타입
    └── styles/                       # 글로벌 스타일
```

### 8.2 Feature 세그먼트 구조

각 feature는 다음 세그먼트로 구성된다:

```
features/{name}/
├── ui/                   # React 컴포넌트
│   ├── ComponentA.tsx
│   ├── ComponentB.tsx
│   └── index.ts          # ui 배럴 export
├── model/                # 타입, 상태, 훅, 쿼리, 스키마
│   ├── types.ts           # 도메인 타입 정의
│   ├── hooks.ts           # 커스텀 훅 (있는 경우)
│   ├── queries.ts         # React Query 훅 (있는 경우)
│   ├── schemas.ts         # Zod 스키마 (있는 경우)
│   ├── errorMessages.ts   # 에러 메시지 (있는 경우)
│   └── index.ts           # model 배럴 export
├── utils/                # feature 전용 유틸리티 (있는 경우)
│   └── badgeMapping.ts    # 뱃지 매핑 등
└── index.ts              # Public API (외부는 반드시 이 파일을 통해 접근)
```

### 8.2.1 Public API (index.ts) 주의사항

> **코드베이스 검증 결과** (2026-03-09): 아래 항목들은 feature 내부에서 구현/export되지만,
> feature 루트 `index.ts`(Public API)에서 re-export 되지 않아 외부에서 접근 불가능하다.
> 필요 시 `index.ts`에 추가해야 한다.

| Feature     | 누락 항목                              | 내부 위치                                                |
| ----------- | -------------------------------------- | -------------------------------------------------------- |
| `community` | `TagSelect` (UI 컴포넌트)              | `community/ui/TagSelect.tsx`                             |
| `community` | `useTags` (훅), `tagQueries` (쿼리 키) | `community/model/hooks.ts`, `community/model/queries.ts` |

### 8.3 레이어 의존성 규칙

- **Feature 간 직접 import 금지**: `features/timeline` → `features/issues` (X)
- **Shared만 허용**: `features/timeline` → `shared/types/common` (O)
- **예외**: `tracking` feature는 `issues`의 타입만 import 허용
- **외부 접근**: 반드시 feature의 `index.ts` 경유

### 8.4 Import 규칙

```ts
// O: index.ts를 통한 feature import
import { TimelineList } from "../../features/timeline";

// O: shared 타입 import
import { type Tag } from "../../shared/types/common";

// X: feature 내부 직접 접근
import { TimelineList } from "../../features/timeline/ui/TimelineList";

// X: 다른 feature 직접 import
import { IssueCard } from "../../features/issues"; // tracking에서만 예외
```

- 상대 경로 사용 (path alias 미사용)
- named export 우선 (default export 지양)
- 타입 import: `import { type Foo }` 인라인 형식
- 정렬: external → internal → relative (eslint-plugin-simple-import-sort)

---

## 9. 디자인 시스템 / UI 가이드라인

### 9.1 shadcn/ui 컴포넌트 사용 원칙

> 모든 UI 컴포넌트는 **shadcn/ui**를 사용한다. HTML 요소를 직접 사용하지 않는다.

```tsx
// O: shadcn/ui 사용
import { Button } from "@/components/ui/button";
<Button variant="ghost" size="sm">클릭</Button>

// X: HTML 요소 직접 사용 금지
<button>클릭</button>
```

- 링크: Next.js `Link` 컴포넌트 사용 (`<a>` 직접 사용 금지)
- 아이콘: `lucide-react` 사용

### 9.2 인터랙티브 요소

| 요소   | 효과                                     |
| ------ | ---------------------------------------- |
| 버튼   | `hover:scale-[1.02] active:scale-[0.98]` |
| 포커스 | `focus:ring-2 focus:ring-primary/20`     |
| 에러   | `animate-in fade-in slide-in-from-top-1` |
| 로딩   | 버튼 텍스트 변경 + `disabled`            |
| 카드   | `hover:shadow-md transition-shadow`      |

### 9.3 접근성 (WCAG 2.1 AA)

| 요구사항           | 적용                                        |
| ------------------ | ------------------------------------------- |
| `aria-label`       | 아이콘 버튼 (검색, 닫기, 비밀번호 토글 등)  |
| `aria-invalid`     | 폼 필드 에러 상태                           |
| `aria-describedby` | 에러 메시지와 폼 필드 연결                  |
| `autocomplete`     | `email`, `current-password`, `new-password` |
| 키보드 네비게이션  | Tab 순서 자연스럽게, Enter로 폼 제출        |
| 색상 대비          | 4.5:1 이상                                  |

### 9.4 반응형 브레이크포인트

| 디바이스 | 범위       | 비고                 |
| -------- | ---------- | -------------------- |
| 모바일   | < 768px    | 기본 (모바일 퍼스트) |
| 태블릿   | 768~1024px | `md:` 프리픽스       |
| 데스크탑 | > 1024px   | `lg:` 프리픽스       |

### 9.5 로딩/에러/빈 상태 패턴

모든 데이터 페칭 컴포넌트는 3가지 상태를 처리한다:

| 상태 | UI                         |
| ---- | -------------------------- |
| 로딩 | 스켈레톤 UI 또는 스피너    |
| 에러 | 에러 메시지 + 재시도 버튼  |
| 빈   | 안내 문구 + 행동 유도 링크 |

---

## 10. 비기능 요구사항

### 10.1 성능

| 지표                           | 목표    |
| ------------------------------ | ------- |
| FCP (First Contentful Paint)   | < 1.5s  |
| LCP (Largest Contentful Paint) | < 2.5s  |
| CLS (Cumulative Layout Shift)  | < 0.1   |
| API 응답 시간 (P95)            | < 500ms |

### 10.2 SEO

- 사건/이슈 상세 페이지: SSR (Server-Side Rendering)
- 메타태그 + Open Graph 태그 동적 생성
- `sitemap.xml`, `robots.txt` 제공
- 시맨틱 HTML 구조

### 10.3 접근성

- WCAG 2.1 AA 수준 (섹션 9.3 참조)

### 10.4 반응형

- 모바일 퍼스트 설계 (섹션 9.4 참조)

### 10.5 보안 (프론트엔드)

- XSS 방지: 마크다운 렌더링 시 sanitize 처리
- CSRF: httpOnly 쿠키 + BFF 프록시 구조
- 민감 정보 노출 금지: API 키, 시크릿을 클라이언트 코드에 포함하지 않음

---

## 11. 기술 스택

| 레이어          | 기술                                                 | 용도                   |
| --------------- | ---------------------------------------------------- | ---------------------- |
| 프레임워크      | Next.js 16 (App Router)                              | SSR, 라우팅, BFF       |
| 언어            | TypeScript 5.9 (strict mode)                         | 타입 안전성            |
| UI 프레임워크   | React 19                                             | 컴포넌트 렌더링        |
| 스타일링        | Tailwind CSS 4                                       | 유틸리티 퍼스트 CSS    |
| UI 라이브러리   | @kim-yeo-appweb-lab/ui (shadcn/ui 마이그레이션 예정) | 디자인 시스템 컴포넌트 |
| 아이콘          | lucide-react                                         | 아이콘                 |
| HTTP 클라이언트 | ky                                                   | API 요청               |
| 데이터 페칭     | @tanstack/react-query v5                             | 서버 상태 관리         |
| 폼              | react-hook-form v7                                   | 폼 상태 관리           |
| 폼 검증         | zod v4 + @hookform/resolvers                         | 스키마 기반 검증       |
| 린팅            | ESLint 9 (flat config) + Prettier                    | 코드 품질              |
| Import 정렬     | eslint-plugin-simple-import-sort                     | import 순서 통일       |
| Git Hooks       | lefthook                                             | pre-commit, pre-push   |
| 테스트          | vitest + @testing-library/react                      | 단위/통합 테스트       |
| API 목킹        | msw                                                  | 테스트 시 API 목킹     |
| 패키지 매니저   | pnpm                                                 | 의존성 관리            |
| Node.js         | v24.13.0                                             | 런타임                 |

---

## 12. AI 에이전트 Boundaries

### Always (항상 지킬 것)

- shadcn/ui 컴포넌트 사용, HTML 요소 직접 사용 금지
- `features → shared` 의존 방향 준수, feature 간 직접 import 금지
- named export 우선, `import { type Foo }` 인라인 형식
- 상대 경로 사용 (path alias 미사용)
- ESLint + Prettier + lefthook 린트 통과
- 새 기능은 반드시 테스트 코드 포함
- 도메인 용어: 코드 식별자는 영문 용어 사전 준수
- TypeScript strict mode 유지
- 모든 데이터 페칭 컴포넌트에 로딩/에러/빈 상태 처리
- `aria-label`, `aria-invalid`, `aria-describedby` 접근성 속성 적용

### Ask First (먼저 확인할 것)

- 새 feature 모듈 추가
- 새 외부 라이브러리/의존성 추가
- 인증/인가 로직 변경
- BFF 프록시 (app/api/) 엔드포인트 추가
- shared 타입 변경 (다른 feature에 영향)
- 새 라우트 추가

### Never (절대 하지 말 것)

- `.env`, 시크릿 키, API 키를 클라이언트 코드에 하드코딩
- feature 간 직접 import (반드시 `index.ts` 경유, tracking 예외)
- feature 내부 파일 직접 접근 (`features/xxx/ui/Component` 직접 import)
- HTML 요소 직접 사용 (`<button>`, `<input>`, `<a>` 등)
- default export 사용 (Next.js page/layout 제외)
- 테스트 없이 비즈니스 로직 변경
- 프로덕션 API를 직접 호출 (반드시 BFF 경유)

### Commands

```bash
pnpm dev                    # 개발 서버 (:3100)
pnpm lint                   # ESLint
pnpm type:check             # TypeScript 타입 체크
pnpm format:check           # Prettier
pnpm build                  # 프로덕션 빌드
pnpm test                   # vitest 테스트
```

### Git Hooks (lefthook)

- **pre-commit**: Prettier → ESLint (staged 파일만)
- **prepare-commit-msg**: 커밋 메시지 템플릿
- **pre-push**: type-check + lint + format:check (병렬)

### CI (GitHub Actions)

- PR 생성 시: `type:check → lint → format:check → build`

---

## 13. MVP 범위 및 로드맵

### Phase 1: MVP (현재 구현 상태)

- [x] 메인 페이지 (7개 섹션: 미니맵, 속보, 핫 게시물, 검색순위, 트렌드, 주요 뉴스, 미디어)
- [x] 타임라인 (일자별 사건 아카이브, 무한 스크롤, 필터/정렬, 상세 모달)
- [x] 이슈 추적 (목록, 필터/정렬, 상세, 트리거 타임라인, 추적 등록/해제)
- [x] 커뮤니티 (게시글 CRUD, 댓글/대댓글, 추천/비추천, 탭/정렬)
- [x] 검색 (통합 검색, 고급 필터, 탭별 결과, 자동완성, 최근 검색어)
- [x] 내 추적 (추적 이슈/저장 사건 모아보기, NEW 뱃지)
- [x] MY 페이지 (프로필, SNS 연동, 계정 관리, 로그아웃/탈퇴)
- [x] 인증 (이메일 + SNS 로그인/회원가입, BFF 프록시)
- [x] 공통 레이아웃 (Header, Footer)
- [x] BFF 프록시 (auth, posts, comments, tags)
- [ ] shadcn/ui 전환 (현재 @kim-yeo-appweb-lab/ui → shadcn/ui 마이그레이션 예정)

### Phase 2: 개선

- ~~어드민 페이지~~ → `trend-korea-admin` 프로젝트로 이관
- [ ] 실시간 피드 개선 (WebSocket/SSE)
- [ ] 알림 시스템 (추적 이슈 업데이트 알림)
- [ ] 게시글 이미지 첨부
- [ ] 다크 모드 / 테마 설정
- [ ] 지표 스트립 (환율, 출산률, 금리 등)
- [ ] 입법 현황 요약

### Phase 3: 확장 (장기)

- [ ] AI 요약 (이슈 자동 요약)
- [ ] 팔로우 (유저 구독)
- [ ] 프리미엄 멤버십
- [ ] 데이터 내보내기 (CSV/JSON)
- [ ] 다국어 지원
- [ ] PWA (오프라인 캐싱)

---

## 14. 용어 사전

| 한글     | 영문           | 코드            | 설명                              |
| -------- | -------------- | --------------- | --------------------------------- |
| 사건     | Event          | `Event`         | 특정 일자에 발생한 단일 이벤트    |
| 이슈     | Issue          | `Issue`         | 언론/SNS에서 지속 추적되는 주제   |
| 트리거   | Trigger        | `Trigger`       | 이슈에 대한 새로운 업데이트       |
| 태그     | Tag            | `Tag`           | 사건/이슈 분류 라벨 (분야/지역)   |
| 출처     | Source         | `Source`        | 뉴스 기사, 공식 발표 등 참고 자료 |
| 게시글   | Post           | `Post`          | 커뮤니티 게시글                   |
| 댓글     | Comment        | `Comment`       | 게시글에 대한 댓글/대댓글         |
| 사용자   | User           | `User`          | 서비스 사용자                     |
| 검색순위 | Search Ranking | `SearchRanking` | 인기 검색 키워드 순위             |
| 추적     | Track          | `track`         | 이슈 관심 등록                    |
| 저장     | Save           | `save`          | 사건 북마크                       |

---

> **완성도**: 코드베이스 실사 기반 프론트엔드 명세 (2026-03-09 기술 검증 반영)

---

## 부록 A. 기술 검증 결과 (2026-03-09)

### A.1 검증 결과 요약

| 검증 항목                   | 상태 | 심각도 | 비고                                                                                        |
| --------------------------- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| 라우트 구조 정합성          | 일치 | --     | PRD 5.1절 = 실제 `src/app/` 구조 완전 일치                                                  |
| Feature 모듈 정합성         | 일치 | --     | 8개 feature (auth, home, timeline, issues, community, search, tracking, mypage) 모두 존재   |
| Feature 세그먼트 구조       | 일치 | --     | ui/, model/, utils/ 세그먼트 정확                                                           |
| 공통 타입 정합성            | 일치 | --     | `Tag`, `Source`, `PeriodFilter`, `CategoryTag`, `RegionTag`, `ApiResponse` 정확 일치        |
| 도메인 타입 정합성          | 일치 | --     | `Event`, `Issue`, `Trigger`, `Post`, `Comment`, `User` 등 정확 일치                         |
| 컴포넌트 존재 여부          | 일치 | --     | PRD에 기술된 모든 컴포넌트가 실제 파일로 존재                                               |
| BFF 프록시 라우트           | 일치 | --     | auth, posts, comments, tags API 라우트 정확 일치                                            |
| Zod 스키마                  | 일치 | --     | 6개 스키마 모두 검증 규칙 정확 일치                                                         |
| React Query 훅              | 보강 | 하     | 구현된 훅/쿼리키 목록이 PRD에 미기재 -> 본 검증에서 7.3절에 추가                            |
| `HotPostItemData` 필드      | 수정 | 중     | PRD: "추천 수, 댓글 수" -> 실제: category, commentCount, author (추천 수 없음) -> 수정 완료 |
| `CommunitySortOption` 타입  | 보강 | 하     | PRD에 값 미기재 -> `"latest" \| "popular" \| "comments"` 추가                               |
| `PostDetail` alias          | 보강 | 하     | Public API에서 `PostDetailType`으로 alias export -> 기재                                    |
| `SearchResultItem.tags`     | 보강 | 하     | `string[]` 타입 (다른 도메인의 `Tag[]`와 상이) -> 주석 추가                                 |
| UI 라이브러리 표기          | 수정 | 중     | PRD: "shadcn/ui" -> 실제: `@kim-yeo-appweb-lab/ui` (마이그레이션 예정) -> 11절 수정 완료    |
| community Public API 누락   | 수정 | 중     | `TagSelect`, `useTags`, `tagQueries`가 `index.ts`에서 미 re-export -> 8.2.1절 추가          |
| `SocialProvider` 중복 정의  | 보강 | 하     | auth + mypage에서 독립적 정의 -> 4.1절에 리팩터링 권장 주석 추가                            |
| `calculatePasswordStrength` | 보강 | 하     | auth Public API에 존재하나 PRD 미기재 -> 6.8절에 추가                                       |
| package.json 의존성         | 일치 | --     | 모든 라이브러리 버전 범위 정확                                                              |

### A.2 종합 판정

**CONDITIONAL PASS** -- 경미한 이슈 존재, 본 검증에서 보완 완료

- 심각도 '중' 이슈 3건은 모두 본 검증에서 PRD에 직접 수정 반영됨
- 심각도 '하' 이슈 6건은 보강 주석/테이블 추가로 해소
- 코드 수준 수정 필요 항목: community `index.ts`에서 `TagSelect`/`useTags`/`tagQueries` re-export 추가 권장
- 리팩터링 권장 항목: mypage의 `SocialProvider` 중복 정의 제거

### A.3 수정 이력

| 수정 위치              | 수정 내용                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------- |
| 4.1 도메인 타입 소유권 | `SocialProvider`, `TrackingTab`/`TrackingSortOption` 행 추가, mypage 중복 주의사항 추가 |
| 6.1 S-HOME-5           | "추천 수, 댓글 수" -> "분야, 댓글 수, 작성자" (실제 타입 반영)                          |
| 6.1 HotPostItemData    | 필드 목록 명시 (id, number, title, category, commentCount, author, createdAt, isHot?)   |
| 6.4 FR-C1              | `CommunitySortOption = "latest" \| "popular" \| "comments"` 명시                        |
| 6.4 FR-C2              | `PostDetail` alias, `PostListParams`, `VoteType` 타입 추가                              |
| 6.4 FR-C3              | `tagIds` 필드명 명시, `useTags`/`tagQueries` 참조 추가                                  |
| 6.5 FR-S4              | `SearchResultItem` 타입 상세화, `tags: string[]` 주의사항                               |
| 6.8 비밀번호 강도      | `calculatePasswordStrength`, `PasswordStrength` 타입 명시                               |
| 7.3 데이터 페칭        | 구현된 React Query 훅 17개 + Query Key 팩토리 3개 목록 추가                             |
| 8.2.1                  | Public API 누락 항목 테이블 신규 추가 (community의 TagSelect, useTags, tagQueries)      |
| 11 기술 스택           | UI 라이브러리: shadcn/ui -> @kim-yeo-appweb-lab/ui (마이그레이션 예정)                  |
