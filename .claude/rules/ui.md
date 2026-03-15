---
description: UI 컴포넌트(shadcn/ui), 접근성, 인터랙션 규칙
paths: ["src/**/*.tsx"]
---

# UI 규칙

## shadcn/ui 필수
- HTML 요소(`<button>`, `<input>`) 직접 사용 금지, shadcn/ui 컴포넌트 사용
- 링크는 Next.js `Link` 사용 (`<a>` 금지)
- 파일명: PascalCase (shadcn CLI 생성 후 리네이밍 필수)
- named export만 사용 (`export default` 금지)

## shadcn 컴포넌트 패턴
- 단일 컴포넌트: Props를 별도 type으로 선언, `ComponentProps`는 react에서 직접 import
- 복합(Compound) 컴포넌트: `Object.assign`으로 서브컴포넌트 병합, 서브컴포넌트에 부모 prefix 필수
- variant가 있는 컴포넌트는 CVA(class-variance-authority) 사용, `cva()` 반환값은 외부 export 금지

## 인터랙티브 요소
- 버튼: `hover:scale-[1.02] active:scale-[0.98]`
- 포커스: `focus:ring-2 focus:ring-primary/20`
- 에러: `animate-in fade-in slide-in-from-top-1`
- 로딩: 텍스트 변경 + disabled

## 접근성 (WCAG 2.1 AA)

### ARIA
- 아이콘 버튼: `aria-label` 필수
- 모달/다이얼로그: `aria-labelledby` (`useId()` 활용)
- 토글/드롭다운: `aria-expanded`
- 로딩 버튼: `aria-busy`
- 폼 에러: `aria-invalid` + `aria-describedby`
- 장식용 아이콘: `aria-hidden="true"`
- 알림/토스트: `aria-live="polite"` 또는 `"assertive"`
- 폼: `autocomplete` 속성 (email, current-password, new-password)

### 키보드
- 모든 인터랙티브 요소 키보드 접근 가능
- 모달: 포커스 트랩, 닫힘 시 트리거로 복귀
- Tab 순서 = 시각적 순서, Enter로 폼 제출

### 시맨틱 HTML
- `<div onClick>` 대신 `<button>`, 적절한 landmark (`<main>`, `<nav>`, `<aside>`)
- 제목 레벨(h1~h6) 순서 유지
- 색상만으로 정보 전달 금지, 텍스트 대비 4.5:1 이상
