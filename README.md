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
├── app/              # Next.js 라우팅 (page, layout, loading, error)
│   ├── (auth)/       # 인증 페이지 (별도 레이아웃)
│   │   ├── login/
│   │   └── register/
│   └── (main)/       # 메인 앱 (공통 네비게이션)
│       ├── page.tsx
│       ├── timeline/
│       ├── issues/
│       ├── community/
│       ├── search/
│       ├── tracking/
│       └── mypage/
│
├── features/         # 기능별 모듈 (도메인 로직)
│   ├── auth/
│   │   ├── ui/       # React 컴포넌트
│   │   └── model/    # 타입, 훅
│   ├── timeline/
│   ├── issues/
│   ├── community/
│   ├── home/
│   ├── mypage/
│   ├── search/
│   └── tracking/
│
└── shared/           # 공통 모듈 (도메인 중립)
    ├── layouts/      # Header, Footer
    ├── ui/           # Logo, SourceLink 등
    ├── utils/        # date, badgeMapping 등
    ├── types/        # 공통 타입
    └── styles/       # 글로벌 스타일
```

## Features

### 인증 시스템

- **이메일 로그인/회원가입**: 실시간 검증, 비밀번호 강도 표시
- **소셜 로그인**: 카카오, 네이버, 구글
- **보안**: 비밀번호 보기/숨기기 토글, autocomplete 지원
- **접근성**: ARIA labels, 키보드 네비게이션, 스크린리더 지원

## Code Quality

### Linting & Formatting

- **Pre-commit**: Prettier 포맷팅 → ESLint 자동 검사
- **Pre-push**: 타입 체크 + 린트 + 포맷 검사 (병렬 실행)
- **CI/CD**: GitHub Actions 자동 검증

### Git Workflow

- Conventional Commits 형식
- 명시적 커밋 원칙 (자동 커밋 금지)
- 작은 단위로 커밋 분리

## Documentation

- [CLAUDE.md](./CLAUDE.md) - 프로젝트 가이드 및 개발 규칙
- [PRD](./docs/PRD.md) - 제품 요구사항 정의서
- [Git 브랜칭 전략](./docs/BRANCH_STRATEGY.md) - Git 브랜칭 및 워크플로우 가이드
