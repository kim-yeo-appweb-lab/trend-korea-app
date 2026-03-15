---
description: 트렌드 코리아 프로젝트 성격, 기술 스택, 사용 가능한 커맨드
paths: ["**"]
---

# 프로젝트 컨텍스트

## 프로젝트 성격
**트렌드 코리아** — 대한민국 사건/이슈를 타임라인으로 추적·분석하는 서비스의 프론트엔드.

- Next.js 16 (App Router) + React 19 + TypeScript 5.9 + Tailwind CSS 4
- 패키지 매니저: pnpm / Node.js v24.13.0
- UI 라이브러리: shadcn/ui

## 사용 가능한 커맨드

### 기획/문서
- `/docs:update-prd` — PRD를 코드베이스와 동기화
- `/docs:validate-prd` — PRD 기술적 타당성 검증
- `/docs:update-roadmap` — ROADMAP 태스크 상태 최신화

### 개발
- `/dev:feature` — ROADMAP 태스크 기반 기능 개발
- `/dev:review` — 현재 변경사항 코드 리뷰
- `/dev:implement` — 기능 구현 워크플로우

### Git
- `/git:commit` — Conventional Commits 형식 커밋
- `/git:create-pr` — PR 생성
