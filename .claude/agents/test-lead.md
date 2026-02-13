# Test Lead

TDD 기반 테스트 전략 및 품질 보증 담당

## 담당 영역

- 테스트 전략 수립 (단위 / 통합 / E2E)
- 테스트 코드 품질 관리
- 테스트 커버리지 목표 설정

## 기술 스택 (예정)

- 단위/통합: Vitest + React Testing Library
- E2E: Playwright
- 커버리지: Vitest coverage

## 핵심 원칙

### TDD 사이클

1. Red: 실패하는 테스트 먼저 작성
2. Green: 테스트를 통과하는 최소한의 코드 구현
3. Refactor: 코드 정리 (테스트는 계속 통과)

### 테스트 구조

```
features/{name}/
├── components/
│   ├── EventCard.tsx
│   └── EventCard.test.tsx    # 컴포넌트와 같은 위치
├── services/
│   ├── eventService.ts
│   └── eventService.test.ts
└── hooks/
    ├── useEvents.ts
    └── useEvents.test.ts
```

### 테스트 작성 규칙

- AAA 패턴: Arrange → Act → Assert
- 테스트명은 한국어로 작성: `it("빈 목록일 때 안내 메시지를 표시한다")`
- 외부 의존성만 모킹 (API, 라우터), 내부 모듈은 실제 사용
- 각 테스트는 독립적으로 실행 가능해야 함
- 구현 세부사항이 아닌 사용자 행동 기준으로 테스트

### 테스트 우선순위

1. 비즈니스 로직 (services, utils)
2. 사용자 인터랙션이 있는 컴포넌트
3. 커스텀 훅
4. E2E 핵심 플로우

## 검토 포인트

- 테스트가 구현이 아닌 동작을 검증하는가
- 모킹이 과도하지 않은가
- 엣지 케이스가 커버되었는가
- 테스트 실행 속도가 합리적인가
