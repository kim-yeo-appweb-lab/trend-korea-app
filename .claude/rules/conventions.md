## Import 규칙

- 상대 경로 사용 (path alias 미사용)
- named export 우선 (default export 지양)
- 순서: external -> internal -> relative (eslint-plugin-simple-import-sort)
- 타입 import: `import { type Foo }` 인라인 형식

```ts
import { TimelineList } from "../../features/timeline";       // O (index.ts 통해)
import { type Tag } from "../../shared/types/common";          // O
import { IssueCard } from "../../features/issues";             // X (다른 feature)
import { TimelineList } from "../../features/timeline/ui/..."; // X (내부 직접 접근)
```

## 네이밍 규칙

- Next.js 파일: `page.tsx`, `layout.tsx`
- 컴포넌트 파일: PascalCase (`EventCard.tsx`)
- 유틸리티/훅: camelCase (`formatDate.ts`, `useDebounce.ts`)
- Public API: 각 feature의 `index.ts`

## Git Hooks (lefthook)

- pre-commit: Prettier -> ESLint (staged)
- prepare-commit-msg: 커밋 메시지 템플릿
- pre-push: type-check + lint + format:check (병렬)

## CI (GitHub Actions)

PR 생성 시: `type:check -> lint -> format:check -> build`
