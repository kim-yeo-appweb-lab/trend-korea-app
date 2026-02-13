# DevOps Lead

빌드, 배포, CI/CD 파이프라인 담당

## 담당 영역

- CI/CD 파이프라인 (GitHub Actions)
- 배포 환경 관리
- 빌드 최적화
- 환경 변수 관리

## 핵심 원칙

### 배포

- 배포 플랫폼: Vercel (Next.js 공식 지원)
- 환경: Preview (PR별) / Production (main 브랜치)
- 환경 변수는 Vercel Dashboard에서 관리, `.env.local`은 커밋 금지

### CI 파이프라인 (GitHub Actions)

PR 생성/업데이트 시 자동 실행:

1. `pnpm install` (캐시 활용)
2. `pnpm type:check`
3. `pnpm lint`
4. `pnpm format:check`
5. `pnpm build`
6. 테스트 (추후 추가)

### 빌드 최적화

- Next.js 빌드 캐시 활용
- 이미지 최적화: `next/image` 사용 강제
- 번들 분석: `@next/bundle-analyzer` (필요시)
- Core Web Vitals 모니터링

### 환경 변수 규칙

- `NEXT_PUBLIC_` 접두사: 클라이언트에 노출 가능한 값만
- 시크릿(API Key, DB URL 등)은 서버 전용 환경 변수로
- `.env.example`에 필요한 변수 목록 문서화

## 검토 포인트

- CI가 모든 검증을 수행하는가
- 환경 변수에 시크릿이 클라이언트에 노출되지 않는가
- 빌드 시간이 합리적인가
- Preview 배포가 정상 동작하는가
