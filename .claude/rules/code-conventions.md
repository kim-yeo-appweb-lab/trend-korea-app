---
description: TypeScript/React 코드 스타일, import 규칙, 컴포넌트 작성 규칙
paths: ["src/**/*.ts", "src/**/*.tsx"]
---

# 코드 컨벤션

## TypeScript
- strict mode 필수
- 리턴 타입은 자동 추론에 맡김 (명시 금지)
- 불필요한 주석 금지
- `React.MouseEvent` 등 네임스페이스 접근 금지 → `import type { MouseEvent } from "react"` 직접 import
- `@deprecated` API 사용 지양, 최신 API로 대체

## Import 규칙
- 순서: external → internal → relative (`eslint-plugin-simple-import-sort`가 강제)
- 타입 import: `import { type Foo }` 인라인 형식
- named export 우선 (default export는 `page.tsx`, `layout.tsx`만)
- 배럴 파일(index.ts) 사용 금지 (feature의 Public API `index.ts`만 예외)

## 네이밍
- 컴포넌트 파일: PascalCase (`EventCard.tsx`)
- 유틸리티/훅 파일: camelCase (`formatDate.ts`, `useDebounce.ts`)
- Next.js 파일: `page.tsx`, `layout.tsx`

## 컴포넌트
- Props는 별도 type으로 선언 (인라인 타입 금지)
- 파일당 하나의 컴포넌트만 export
- 외부에서 Props 접근: `ComponentProps<typeof C>` 사용
- 무거운 컴포넌트는 `React.lazy`로 지연 로딩
- JSX 인라인 함수 지양: `onChange={handleChange}` 패턴

## CI
PR 생성 시: `type:check → lint → format:check → build`
