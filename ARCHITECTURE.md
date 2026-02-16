# Architecture

트렌드 코리아 프론트엔드 아키텍처 가이드

## 개요

본 프로젝트는 **Features + Shared 패턴**을 기반으로 한 레이어드 아키텍처를 채택합니다.

### 핵심 원칙

1. **레이어 단순화**: `app → features → shared` 3단계 의존성
2. **도메인 격리**: 각 feature는 독립적이며, 상호 참조 금지
3. **명확한 역할 분리**: features는 도메인 로직, shared는 도메인 중립만

## 디렉토리 구조

```
src/
├── app/                           # Next.js 라우팅 + 초기화
│   ├── (auth)/                    # 인증 Route Group
│   ├── (main)/                    # 메인 Route Group
│   ├── providers/                 # 전역 Providers
│   ├── config/                    # 앱 설정
│   └── styles/                    # 글로벌 스타일
│
├── features/                      # 비즈니스 기능 (도메인)
│   ├── timeline/
│   │   ├── ui/                    # React 컴포넌트
│   │   ├── model/                 # 타입, 훅, 비즈니스 로직
│   │   ├── utils/                 # feature 전용 유틸 (예: badgeMapping)
│   │   └── index.ts               # Public API
│   ├── issues/
│   ├── community/
│   ├── auth/
│   ├── mypage/
│   ├── search/
│   ├── tracking/
│   └── home/
│
├── shared/                        # 도메인 중립 유틸리티
│   ├── ui/                        # 공통 UI (Logo, SourceLink)
│   ├── lib/utils/                 # 유틸리티 함수 (date, 등)
│   └── types/                     # 공통 타입 (Tag, Source, Filter)
│
└── widgets/                       # 전역 레이아웃
    ├── Header.tsx
    └── Footer.tsx
```

## 레이어 규칙

### App 레이어

**역할**: Next.js 라우팅 + features 조립

```typescript
// ✅ Good: app/page.tsx
import { Section1, Section2 } from "../../features/home";

export default function Page() {
  return (
    <div>
      <Section1 />
      <Section2 />
    </div>
  );
}

// ❌ Bad: 비즈니스 로직 포함
export default function Page() {
  const [data, setData] = useState();
  // 복잡한 로직...
}
```

**규칙**:

- ✅ features에서 컴포넌트 import
- ✅ 간단한 레이아웃 조합
- ❌ 비즈니스 로직 작성 금지
- ❌ 상태 관리 금지 (features로)

---

### Features 레이어

**역할**: 비즈니스 도메인 구현

```typescript
// ✅ Good: features/timeline/model/types.ts
import { type Tag, type Source } from "../../../shared/types/common";

export type Event = {
	id: string;
	title: string;
	tags: Tag[]; // ✅ shared 공통 타입
	sources: Source[];
};

// ✅ Good: features/timeline/utils/badgeMapping.ts
import { type Importance } from "../model";

export const importanceBadgeMap: Record<Importance, BadgeMapping> = {
	high: { colorScheme: "danger", label: "높음" }
};
```

**규칙**:

- ✅ 도메인 타입은 feature 소유 (`model/types.ts`)
- ✅ feature 전용 유틸은 `utils/` 폴더에
- ✅ shared 공통 타입 (Tag, Source) import 허용
- ❌ 다른 feature import 금지
  - `features/timeline → features/issues` ❌
  - `features/timeline → entities/event` ❌ (entities 제거됨)

---

### Shared 레이어

**역할**: 도메인 중립 코드만

```typescript
// ✅ Good: shared/types/common.ts
export type Tag = {
	id: string;
	name: string;
	type: "category" | "region";
};

export type Source = {
	url: string;
	publisher: string;
};

// ✅ Good: shared/lib/utils/date.ts
export function formatDate(date: Date): string {
	// 도메인 중립 유틸
}

// ❌ Bad: shared에 도메인 종속 코드
import { type IssueStatus } from "../../../features/issues"; // ❌
```

**규칙**:

- ✅ Tag, Source처럼 **여러 feature가 공유**하는 타입만
- ✅ 도메인 없는 유틸 (날짜, 포맷팅 등)
- ❌ features import 금지 (역방향 의존성)
- ❌ 도메인 로직 금지

---

## 타입 소유권

### 도메인 타입 → Features

| 타입  | 위치                                | 소유자    | 이유                 |
| ----- | ----------------------------------- | --------- | -------------------- |
| Event | `features/timeline/model/types.ts`  | timeline  | 타임라인 도메인 전용 |
| Issue | `features/issues/model/types.ts`    | issues    | 이슈 도메인 전용     |
| Post  | `features/community/model/types.ts` | community | 커뮤니티 도메인 전용 |
| User  | `features/auth/model/types.ts`      | auth      | 인증 도메인 전용     |

### 공통 타입 → Shared

| 타입   | 위치                     | 사용처                       | 이유               |
| ------ | ------------------------ | ---------------------------- | ------------------ |
| Tag    | `shared/types/common.ts` | Event, Issue, Post 모두 사용 | **진짜 공통 타입** |
| Source | `shared/types/common.ts` | Event, Issue, Trigger 사용   | **진짜 공통 타입** |

---

## Import 규칙

### 의존성 방향

```
app → features → shared
```

**역방향 금지**: `shared → features` ❌, `features → app` ❌

### Import 예시

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
import { IssueCard } from "../../features/issues"; // ❌

// ❌ Shared → Features
import { type Event } from "../../features/timeline"; // ❌
```

### Public API 패턴

각 feature는 `index.ts`를 통해서만 외부에 노출합니다.

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

---

## Feature 개발 가이드

### 새 Feature 추가 절차

1. **디렉토리 생성**

   ```
   features/
   └── my-feature/
       ├── ui/
       ├── model/
       ├── utils/        # 필요시
       └── index.ts
   ```

2. **타입 정의** (`model/types.ts`)

   ```typescript
   import { type Tag, type Source } from "../../../shared/types/common";

   export type MyEntity = {
   	id: string;
   	// 공통 타입 사용
   	tags: Tag[];
   	sources: Source[];
   };
   ```

3. **Public API 작성** (`index.ts`)

   ```typescript
   export { MyComponent } from "./ui";
   export type { MyEntity } from "./model";
   ```

4. **App에서 사용** (`app/page.tsx`)
   ```typescript
   import { MyComponent } from "../../features/my-feature";
   ```

### Feature 내부 구조

```typescript
// ui/MyComponent.tsx
import { type MyEntity } from "../model"; // ✅ 같은 feature
import { type Tag } from "../../../shared/types"; // ✅ shared
import { myUtil } from "../utils/myUtil"; // ✅ feature utils

export function MyComponent() {
	// 컴포넌트 구현
}

// model/types.ts
import { type Tag, type Source } from "../../../shared/types/common";

export type MyEntity = {
	id: string;
	tags: Tag[];
	sources: Source[];
};

// model/hooks.ts
import { type MyEntity } from "./types";

export function useMyFeature() {
	// 훅 구현
}

// model/index.ts
export type { MyEntity } from "./types";
export { useMyFeature } from "./hooks";

// utils/myUtil.ts (feature 전용 유틸)
import { type MyEntity } from "../model";

export function myUtil(entity: MyEntity) {
	// feature 전용 로직
}
```

---

## 예외 케이스

### 1. Tag, Source는 왜 Shared에?

**결정**: Tag와 Source는 `shared/types/common.ts`에 위치

**이유**:

- Event, Issue, Post 등 **3개 이상의 feature**가 사용
- 완전히 도메인 중립적 (분야, 지역 태그)
- feature 간 순환 참조 방지

```typescript
// ✅ 올바른 사용
import { type Tag } from "../../shared/types/common";
```

### 2. BadgeMapping은 왜 Features에?

**결정**: `issueStatusBadgeMap`, `importanceBadgeMap`은 각 feature의 `utils/badgeMapping.ts`에 위치

**이유**:

- IssueStatus, Importance는 **도메인 타입**
- 도메인 종속 로직은 feature 소유

```typescript
// ✅ features/issues/utils/badgeMapping.ts
import { type IssueStatus } from "../model";

export const issueStatusBadgeMap: Record<IssueStatus, BadgeMapping> = {
	ongoing: { colorScheme: "danger", label: "진행중" }
};
```

### 3. Tracking Feature의 IssueStatus 사용

**문제**: tracking feature가 issues feature의 타입을 사용

**해결**: 예외적으로 허용 (읽기 전용 타입 import)

```typescript
// features/tracking/ui/TrackingIssueCard.tsx
import { type IssueStatus } from "../../issues/model"; // ✅ 예외 허용
import { issueStatusBadgeMap } from "../../issues/utils/badgeMapping"; // ✅
```

**주의**: 컴포넌트나 비즈니스 로직은 import 금지, 타입만 허용

---

## 마이그레이션 히스토리

### Before: FSD 2.0 (5 레이어)

```
app → views → widgets → features → entities → shared
```

**문제점**:

- views: 단순 래퍼 역할만 (features 조합만)
- entities: 타입 정의만 (중복 타입)
- 복잡한 의존성 체인 (5단계)

### After: Features + Shared (3 레이어)

```
app → features → shared
```

**개선점**:

- ✅ 의존성 단순화 (3단계)
- ✅ 역할 명확화 (features는 도메인, shared는 중립)
- ✅ 코드 중복 제거 (views, entities 제거)

---

## 체크리스트

### Feature 개발 시

- [ ] 타입은 `model/types.ts`에 정의했는가?
- [ ] Public API (`index.ts`)를 작성했는가?
- [ ] 다른 feature를 import하지 않았는가?
- [ ] 도메인 종속 유틸은 `utils/`에 배치했는가?
- [ ] shared에서 공통 타입 (Tag, Source)만 import했는가?

### Shared 추가 시

- [ ] 정말 도메인 중립적인가?
- [ ] 3개 이상의 feature에서 사용하는가?
- [ ] features를 import하지 않았는가?

---

## 참고 문서

- `CLAUDE.md` - 프로젝트 전체 가이드
- `docs/PRD.md` - 제품 요구사항
- `docs/BRANCH_STRATEGY.md` - Git 워크플로우
