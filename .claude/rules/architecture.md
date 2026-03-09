## 디렉터리 구조 (Features + Shared 패턴)

의존성: `app -> features -> shared` (역방향 금지)

```
src/
├── app/
│   ├── (auth)/          # login, register
│   ├── (main)/          # 메인 레이아웃
│   │   ├── timeline/  issues/  community/
│   │   ├── search/  tracking/  mypage/
│   └── layout.tsx
├── features/
│   ├── timeline/  issues/  community/  auth/
│   ├── mypage/  search/  tracking/  home/
└── shared/
    ├── layouts/  ui/  utils/  types/  styles/
```

## Feature 세그먼트 구조

- `ui/` — React 컴포넌트
- `model/` — 타입, 상태, 훅 (types.ts, hooks.ts, index.ts)
- `utils/` — feature 전용 유틸리티
- `index.ts` — Public API (외부는 반드시 이 파일을 통해 접근)

## 레이어 의존성 규칙

- Feature 간 직접 import 금지 (`features/timeline -> features/issues` X)
- Shared만 허용: `features/timeline -> shared/types/common` O
- 예외: tracking feature는 issues의 타입만 import 허용

## 타입 소유권

- 도메인 타입 -> Features: Event(timeline), Issue(issues), Post(community), User(auth)
- 공통 타입 -> Shared: Tag, Source

## 라우트 구조

| 경로               | 설명           |
| ------------------ | -------------- |
| `/`                | 홈             |
| `/timeline`        | 타임라인       |
| `/timeline/:date`  | 특정 날짜      |
| `/issues`          | 이슈 목록      |
| `/issues/:id`      | 이슈 상세      |
| `/community`       | 커뮤니티       |
| `/community/write` | 글쓰기         |
| `/community/:id`   | 게시글 상세    |
| `/search`          | 검색           |
| `/tracking`        | 내 추적        |
| `/mypage`          | MY 페이지      |
| `/mypage/edit`     | 회원 정보 수정 |
