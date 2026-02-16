# Git 브랜칭 전략

## 개요

GitHub Flow 기반의 브랜칭 모델을 사용합니다. `main` 브랜치는 항상 배포 가능한 상태를 유지하며, 모든 작업은 작업 브랜치에서 진행 후 Pull Request를 통해 병합됩니다.

## 브랜치 명명 규칙

```
<타입>/<설명>
```

| 타입        | 용도           | 예시                                  |
| ----------- | -------------- | ------------------------------------- |
| `feature/`  | 새 기능        | `feature/user-authentication`         |
| `fix/`      | 버그 수정      | `fix/login-validation-error`          |
| `hotfix/`   | 긴급 수정      | `hotfix/critical-api-error`           |
| `refactor/` | 코드 개선      | `refactor/event-service-optimization` |
| `docs/`     | 문서 작업      | `docs/api-endpoint-guide`             |
| `chore/`    | 설정/도구 변경 | `chore/update-eslint-config`          |

### 명명 규칙

- 영문 소문자 및 하이픈만 사용
- 설명은 명확하고 간결하게 (50자 이내)
- 특수문자, 언더스코어, 마침표 제외

**올바른 예시**: `feature/issue-detail-page`, `fix/session-timeout-crash`

**피할 예시**: `feature/새기능`, `feature/MY_FEATURE`, `fix/fix-all`

## 워크플로우

```bash
# 1. 브랜치 생성
git checkout -b feature/your-feature

# 2. 작업 및 커밋 (Conventional Commits)
git add .
git commit -m "feat: 기능 설명"

# 3. 푸시
git push -u origin feature/your-feature

# 4. PR 생성 및 리뷰 (GitHub UI)

# 5. 병합 및 정리
git checkout main
git pull origin main
git branch -d feature/your-feature
```

## 자동 검증

### 브랜치명 검증

commit 시점에 자동으로 브랜치명 형식을 검증합니다. 규칙을 위반하면 commit이 중단되고 올바른 형식이 안내됩니다.

**검증 규칙**:

```
^(main|develop|(feature|fix|hotfix|refactor|docs|chore)\/[a-z0-9]([a-z0-9-]*[a-z0-9])?)$
```

### Git Hooks 실행 순서

1. **pre-commit**: 포매팅 및 린트 검사
2. **prepare-commit-msg**: 브랜치명 검증 → 커밋 메시지 템플릿 적용
3. **pre-push**: 타입 체크, 린트, 포매트 검사

## 필수 규칙

- 모든 작업은 작업 브랜치에서 진행 (main 직접 작업 금지)
- PR 없이 main 병합 금지
- commit 메시지는 Conventional Commits 형식 준수
- 병합 전 모든 CI/CD 통과 필수

## 시나리오별 명령어

### 새 기능 개발

```bash
git checkout -b feature/timeline-filter
git add . && git commit -m "feat: 타임라인 날짜 필터 추가"
git push -u origin feature/timeline-filter
```

### 버그 수정

```bash
git checkout -b fix/login-validation
git add . && git commit -m "fix: 로그인 폼 유효성 검사 오류"
git push -u origin fix/login-validation
```

### 긴급 수정

```bash
git checkout -b hotfix/api-error
git add . && git commit -m "fix: API 응답 파싱 오류"
git push -u origin hotfix/api-error
```

### main 동기화 (작업 중 main이 업데이트된 경우)

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature/your-feature
```

### 마지막 커밋 수정

```bash
# 메시지만 수정
git commit --amend -m "올바른 메시지"

# 또는 내용 수정
git add .
git commit --amend --no-edit
```

## 참고

자세한 내용은 다음을 참조하세요:

- [Conventional Commits](https://www.conventionalcommits.org/ko/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- `CLAUDE.md` - 프로젝트 전체 규칙 및 아키텍처
