# CLAUDE.md

## 프로젝트 개요

대한민국 사건/이슈 타임라인 추적 서비스 프론트엔드.

- Next.js 16 (App Router) + React 19 + TypeScript 5.9 + Tailwind CSS 4
- 패키지 매니저: **pnpm** / Node.js: v24.14.0

## 검증 명령어

```bash
pnpm dev                         # 개발 서버 (:3100)
pnpm lint                        # ESLint
pnpm type:check                  # TypeScript 타입 체크
pnpm format:check                # Prettier
pnpm build                       # 프로덕션 빌드
pnpm test                        # Vitest (watch)
pnpm test:run                    # Vitest (단회 실행)
```

## 도메인 용어

| 한글      | 영문 (코드)                                       | 설명                            |
| --------- | ------------------------------------------------- | ------------------------------- |
| 사건      | `Event`                                           | 특정 일자에 발생한 단일 이벤트  |
| 이슈      | `Issue`                                           | 언론/SNS에서 지속 추적되는 주제 |
| 트리거    | `Trigger`                                         | 이슈에 대한 새로운 업데이트     |
| 게시글    | `Post`                                            | 커뮤니티 게시글                 |
| 이슈 상태 | `ongoing` / `closed` / `reignited` / `unverified` |                                 |

## 상세 문서 (필요시 참조)

- `docs/PRD.md` — 상세 제품 요구사항
- `docs/ROADMAP.md` — 개발 로드맵
