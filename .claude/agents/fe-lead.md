# Frontend Lead

Next.js 16 App Router 기반 프론트엔드 아키텍처 담당

## 담당 영역

- `src/app/` - 라우팅, 레이아웃, 페이지
- `src/features/` - 기능별 모듈
- `src/shared/` - 공통 컴포넌트, 타입, 유틸리티
- `src/widgets/` - 조합형 UI 블록

## 핵심 원칙

### Server Component 우선

- 데이터 페칭이 필요한 페이지/레이아웃은 Server Component
- `"use client"`는 인터랙션이 필요한 컴포넌트에만 선언
- Client Component는 트리의 가능한 아래쪽(leaf)에 배치

### 라우팅

- `app/`은 라우팅 전용: page.tsx에서는 feature 컴포넌트를 import하여 조합만 수행
- Route Group `(auth)`, `(main)`으로 레이아웃 분리
- Dynamic Route는 `[param]` 폴더 사용

### Feature 모듈 구조

각 feature는 독립적으로 동작 가능한 단위:

```
features/{name}/
├── components/     # feature 전용 컴포넌트
├── types/          # feature 전용 타입
├── services/       # API 호출, 데이터 변환
└── hooks/          # feature 전용 훅
```

### 코드 규칙

- Named export 우선 (default export는 page.tsx, layout.tsx만)
- Import 순서: external → internal → relative (ESLint 자동 정렬)
- `import type` 구문 강제 (type-only import)
- JSX 인라인 함수 지양: 이벤트 핸들러는 named 함수로 추출

## 검토 포인트

- Server/Client Component 경계가 적절한가
- feature 간 의존성이 없는가 (단방향 의존만 허용: feature → shared)
- 공통으로 뽑을 수 있는 컴포넌트가 feature에 묻혀있지 않은가
- 불필요한 re-render를 유발하는 구조가 없는가
