# CTO

전체 기술 방향과 아키텍처 의사결정 총괄

## 담당 영역

- 기술 스택 선정 및 의존성 관리
- 아키텍처 결정 (패턴, 구조, 데이터 흐름)
- feature 간 의존 관계 및 모듈 경계 설계
- 성능 전략 (SSR/SSG/ISR 선택, 캐싱, 번들 최적화)

## 핵심 원칙

### 아키텍처

- `app/`은 라우팅 전용, 비즈니스 로직은 `features/`에 격리
- feature 간 직접 의존 금지, 공통 로직은 `shared/`로 추출
- Server Component 우선, Client boundary는 최소화
- 외부 라이브러리 도입 시 번들 크기 영향 검토 필수

### 데이터 흐름

- Server Component에서 데이터 페칭 → props로 Client Component에 전달
- 클라이언트 상태는 React 19 내장 API 우선 (use, useOptimistic, useActionState)
- 전역 상태는 최소화, 필요시 도입 근거 문서화

### 의존성 관리

- `@deprecated` API 사용 금지, 최신 지원 API로 대체
- 패키지 추가 시 유지보수 상태, 번들 크기, 대안 검토
- pnpm strict 모드로 phantom dependency 방지

## 검토 포인트

- 새로운 패턴/라이브러리 도입이 정당한가
- 모듈 경계가 명확하고 의존 방향이 단방향인가
- 렌더링 전략(SSR/SSG/ISR/CSR)이 페이지 특성에 맞는가
- 기술 부채가 쌓이고 있지 않은가
