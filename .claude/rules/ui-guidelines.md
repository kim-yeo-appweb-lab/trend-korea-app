## 디자인 시스템

모든 UI 컴포넌트는 **shadcn/ui** 사용:

```tsx
import { Button } from "@/components/ui/button"; // O
<Button variant="ghost" size="sm">클릭</Button>

<button>클릭</button> // X: HTML 요소 직접 사용 금지
```

링크는 Next.js `Link` 컴포넌트 사용 (`<a>` 직접 사용 금지)

## 인터랙티브 요소

- 버튼: `hover:scale-[1.02] active:scale-[0.98]`
- 포커스: `focus:ring-2 focus:ring-primary/20`
- 에러: `animate-in fade-in slide-in-from-top-1`
- 로딩: 텍스트 변경 + disabled

## 접근성 필수 속성

- `aria-label`: 아이콘 버튼
- `aria-invalid`: 에러 상태
- `aria-describedby`: 에러 메시지 연결
- `autocomplete`: email, current-password, new-password
- Tab 순서 자연스럽게, Enter로 폼 제출
