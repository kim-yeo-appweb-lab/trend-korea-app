# Trend Korea Frontend

대한민국 사건/이슈 타임라인 추적 서비스의 프론트엔드 애플리케이션

## Tech Stack

| Category        | Technology                        |
| --------------- | --------------------------------- |
| Framework       | Next.js 16 (App Router)           |
| UI Library      | React 19                          |
| Language        | TypeScript 5.9 (strict mode)      |
| Styling         | Tailwind CSS 4                    |
| Package Manager | pnpm                              |
| Linting         | ESLint 9 (flat config) + Prettier |
| Git Hooks       | lefthook                          |
| CI              | GitHub Actions                    |

## Getting Started

### Prerequisites

- Node.js v24.13.0+ (`.nvmrc` 참고)
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

http://localhost:3000 에서 확인

### Scripts

```bash
pnpm build          # 프로덕션 빌드
pnpm lint           # ESLint 검사
pnpm lint:fix       # ESLint 자동 수정
pnpm format         # Prettier 포맷팅
pnpm format:check   # Prettier 검사
pnpm type:check     # TypeScript 타입 체크
```

## Project Structure

```
src/
├── app/              # 라우팅 전용 (page, layout, loading, error)
│   ├── (auth)/       # 인증 페이지 (별도 레이아웃)
│   └── (main)/       # 메인 앱 (공통 네비게이션)
├── features/         # 기능별 모듈 (components, types, services, hooks)
├── shared/           # 공통 모듈 (UI, hooks, utils, types, lib)
└── widgets/          # 조합형 UI 블록
```

## Documentation

- [PRD](./docs/PRD.md) - 제품 요구사항 정의서
- [Git 브랜칭 전략](./docs/BRANCH_STRATEGY.md) - Git 브랜칭 및 워크플로우 가이드
