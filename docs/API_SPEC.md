# 트렌드 코리아 - 백엔드 API 규격서

**작성일**: 2026-02-15
**버전**: 1.0
**상태**: MVP Phase 1

---

## 1. API 개요

### 1.1 기본 정보

| 항목               | 값                                                                 |
| ------------------ | ------------------------------------------------------------------ |
| **베이스 URL**     | `https://api.trend-korea.com/api/v1`                               |
| **개발 환경**      | `http://localhost:8000/api/v1`                                     |
| **버전 전략**      | URL 기반 (`/api/v1/`)                                              |
| **요청/응답 형식** | `application/json` (UTF-8)                                         |
| **인증 방식**      | JWT (Bearer Token)                                                 |
| **CORS**           | 프로덕션: `https://trend-korea.com`, 개발: `http://localhost:3000` |

### 1.2 요청 규칙

```
GET /api/v1/events?page=1&limit=10
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### 1.3 타임스탬프 형식

모든 날짜/시간은 ISO 8601 UTC 형식:

```
2026-02-15T10:30:00.000Z
```

---

## 2. 공통 응답 규격

### 2.1 성공 응답 (단일 리소스)

**HTTP 200 OK**

```json
{
	"success": true,
	"data": {
		"id": "event_123",
		"title": "서울시장 선거 결과",
		"summary": "2026년 서울시장 선거 결과 발표...",
		"occurredAt": "2026-02-15T10:30:00.000Z"
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

### 2.2 페이지네이션 응답 (Offset-based)

**HTTP 200 OK**

적용: Issues, Search, Community

```json
{
	"success": true,
	"data": {
		"items": [
			{
				"id": "issue_1",
				"title": "이슈 제목",
				"status": "ongoing"
			}
		],
		"pagination": {
			"currentPage": 1,
			"totalPages": 10,
			"totalItems": 100,
			"itemsPerPage": 10,
			"hasNext": true,
			"hasPrev": false
		}
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

### 2.3 무한 스크롤 응답 (Cursor-based)

**HTTP 200 OK**

적용: Timeline, Community Feed

```json
{
	"success": true,
	"data": {
		"items": [
			{
				"id": "event_1",
				"title": "사건 제목",
				"occurredAt": "2026-02-15T10:30:00.000Z"
			}
		],
		"cursor": {
			"next": "eyJpZCI6IjEwMCIsImRhdGUiOiIyMDI2LTAyLTE1In0=",
			"hasMore": true
		}
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

### 2.4 생성/수정 응답

**HTTP 201 Created / 200 OK**

```json
{
	"success": true,
	"data": {
		"id": "post_123",
		"title": "새로운 게시글",
		"createdAt": "2026-02-15T10:30:00.000Z"
	},
	"message": "생성 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

### 2.5 삭제 응답

**HTTP 204 No Content** (또는 200 OK)

```json
{
	"success": true,
	"data": null,
	"message": "삭제 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

### 2.6 실패 응답

**HTTP 400, 401, 403, 404, 409, 429, 500**

```json
{
	"success": false,
	"error": {
		"code": "E_AUTH_002",
		"message": "인증 토큰이 만료되었습니다.",
		"details": {
			"expiredAt": "2026-02-15T11:30:00.000Z"
		}
	},
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

## 3. 에러 규격

### 3.1 에러 코드 체계

```
E_[CATEGORY]_[NUMBER]

E_AUTH_001~099    : 인증 오류 (401)
E_PERM_001~099    : 권한 오류 (403)
E_VALID_001~099   : 유효성 검증 (400)
E_RESOURCE_001~099: 리소스 없음 (404)
E_CONFLICT_001~099: 중복/충돌 (409)
E_RATE_001~099    : Rate Limiting (429)
E_SERVER_001~099  : 서버 오류 (500)
```

### 3.2 주요 에러 코드

| 코드           | HTTP | 메시지                           | 상황                       |
| -------------- | ---- | -------------------------------- | -------------------------- |
| E_AUTH_001     | 401  | 인증 토큰이 없습니다             | 헤더에 Authorization 누락  |
| E_AUTH_002     | 401  | 인증 토큰이 만료되었습니다       | 토큰 유효기간 초과         |
| E_AUTH_003     | 401  | 유효하지 않은 토큰입니다         | 변조된 토큰                |
| E_PERM_001     | 403  | 해당 기능에 대한 권한이 없습니다 | member 권한 필요한데 guest |
| E_VALID_001    | 400  | 필수 필드가 누락되었습니다       | title 필드 없음            |
| E_VALID_002    | 400  | 필드 형식이 유효하지 않습니다    | 숫자 필드에 문자 입력      |
| E_RESOURCE_001 | 404  | 사건을 찾을 수 없습니다          | 존재하지 않는 event_id     |
| E_RESOURCE_002 | 404  | 이슈를 찾을 수 없습니다          | 존재하지 않는 issue_id     |
| E_CONFLICT_001 | 409  | 이미 가입된 이메일입니다         | 회원가입 시 중복 이메일    |
| E_CONFLICT_002 | 409  | 이미 추적 중인 이슈입니다        | 중복 추적 요청             |
| E_RATE_001     | 429  | 요청 제한을 초과했습니다         | Rate limit 초과            |
| E_SERVER_001   | 500  | 서버 내부 오류가 발생했습니다    | 예상치 못한 오류           |

---

## 4. 인증 및 권한

### 4.1 JWT 토큰 구조

**로그인 응답**

```json
{
	"success": true,
	"data": {
		"user": {
			"id": "user_123",
			"email": "user@example.com",
			"nickname": "testuser",
			"role": "member"
		},
		"tokens": {
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"expiresIn": 3600,
			"expiresAt": "2026-02-15T11:30:00.000Z"
		}
	},
	"message": "로그인 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

### 4.2 권한 매트릭스

| 기능                | guest | member | admin |
| ------------------- | ----- | ------ | ----- |
| 조회/검색           | ✓     | ✓      | ✓     |
| 사건/이슈 저장      | ✗     | ✓      | ✓     |
| 게시글/댓글 작성    | ✗     | ✓      | ✓     |
| 추천/비추천         | ✗     | ✓      | ✓     |
| 사건/이슈/태그 CRUD | ✗     | ✗      | ✓     |

### 4.3 인증 헤더

```
Authorization: Bearer {accessToken}
```

### 4.4 토큰 갱신

**요청**

```
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"expiresIn": 3600,
		"expiresAt": "2026-02-15T11:30:00.000Z"
	},
	"message": "토큰 갱신 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

## 5. 엔드포인트 명세

### 5.1 인증 (Auth) - 6개

#### 5.1.1 회원가입

**POST** `/api/v1/auth/register`

권한: 없음 (누구나 가능)

**요청 파라미터**

| 이름     | 타입   | 필수 | 기본값 | 예시               | 설명                               |
| -------- | ------ | ---- | ------ | ------------------ | ---------------------------------- |
| email    | string | O    | -      | `user@example.com` | 이메일 (유일)                      |
| password | string | O    | -      | `SecurePass123!`   | 비밀번호 (8자 이상, 특수문자 포함) |
| nickname | string | O    | -      | `testuser`         | 닉네임 (2~20자, 유일)              |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "nickname": "testuser"
  }'
```

**성공 응답 (201 Created)**

```json
{
	"success": true,
	"data": {
		"user": {
			"id": "user_123",
			"email": "user@example.com",
			"nickname": "testuser",
			"role": "member",
			"createdAt": "2026-02-15T10:30:00.000Z"
		},
		"tokens": {
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"expiresIn": 3600
		}
	},
	"message": "회원가입 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**실패 응답**

```json
{
	"success": false,
	"error": {
		"code": "E_CONFLICT_001",
		"message": "이미 가입된 이메일입니다.",
		"details": {
			"field": "email"
		}
	},
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_VALID_001: 필수 필드 누락
- E_VALID_002: 이메일 형식 오류
- E_VALID_003: 비밀번호 복잡도 부족
- E_CONFLICT_001: 이메일 중복
- E_CONFLICT_002: 닉네임 중복
- E_RATE_001: 회원가입 시도 제한 (1시간 5회)

---

#### 5.1.2 로그인

**POST** `/api/v1/auth/login`

권한: 없음

**요청 파라미터**

| 이름     | 타입   | 필수 | 예시               |
| -------- | ------ | ---- | ------------------ |
| email    | string | O    | `user@example.com` |
| password | string | O    | `SecurePass123!`   |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"user": {
			"id": "user_123",
			"email": "user@example.com",
			"nickname": "testuser",
			"role": "member",
			"profileImage": null,
			"trackedIssueIds": [],
			"savedEventIds": []
		},
		"tokens": {
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"expiresIn": 3600,
			"expiresAt": "2026-02-15T11:30:00.000Z"
		}
	},
	"message": "로그인 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**실패 응답**

```json
{
	"success": false,
	"error": {
		"code": "E_AUTH_001",
		"message": "이메일 또는 비밀번호가 일치하지 않습니다.",
		"details": {}
	},
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_VALID_001: 필수 필드 누락
- E_AUTH_001: 이메일/비밀번호 불일치
- E_RATE_001: 로그인 시도 제한 (15분 10회)

---

#### 5.1.3 로그아웃

**POST** `/api/v1/auth/logout`

권한: member, admin

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/auth/logout \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": null,
	"message": "로그아웃 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_AUTH_002: 토큰 만료

---

#### 5.1.4 토큰 갱신

**POST** `/api/v1/auth/refresh`

권한: 없음

**요청 파라미터**

| 이름         | 타입   | 필수 |
| ------------ | ------ | ---- |
| refreshToken | string | O    |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"expiresIn": 3600,
		"expiresAt": "2026-02-15T11:30:00.000Z"
	},
	"message": "토큰 갱신 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_VALID_001: refreshToken 누락
- E_AUTH_003: 유효하지 않은 토큰

---

#### 5.1.5 SNS 로그인 (카카오/네이버/구글)

**POST** `/api/v1/auth/social-login`

권한: 없음

**요청 파라미터**

| 이름        | 타입   | 필수 | 예시                                    |
| ----------- | ------ | ---- | --------------------------------------- |
| provider    | string | O    | `kakao`, `naver`, `google`              |
| code        | string | O    | `authorization_code_from_provider`      |
| redirectUri | string | O    | `https://trend-korea.com/auth/callback` |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/auth/social-login \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "kakao",
    "code": "abc123def456",
    "redirectUri": "https://trend-korea.com/auth/callback"
  }'
```

**성공 응답 (200 OK / 201 Created)**

신규 가입 또는 기존 사용자 로그인 시 동일한 응답 구조

```json
{
	"success": true,
	"data": {
		"user": {
			"id": "user_124",
			"email": "user@kakao.com",
			"nickname": "kakao_user_123",
			"role": "member",
			"socialProviders": ["kakao"],
			"profileImage": "https://example.com/image.jpg"
		},
		"tokens": {
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"expiresIn": 3600
		},
		"isNewUser": true
	},
	"message": "SNS 로그인 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_VALID_001: 필수 필드 누락
- E_VALID_002: provider 유효하지 않음
- E_AUTH_001: SNS 인증 실패

---

#### 5.1.6 회원탈퇴

**DELETE** `/api/v1/auth/withdraw`

권한: member, admin

**요청 파라미터**

| 이름     | 타입   | 필수              | 설명          |
| -------- | ------ | ----------------- | ------------- |
| password | string | O (이메일 가입만) | 비밀번호 확인 |

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/auth/withdraw \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "SecurePass123!"
  }'
```

**성공 응답 (204 No Content 또는 200 OK)**

```json
{
	"success": true,
	"data": null,
	"message": "회원탈퇴 완료",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_VALID_001: 비밀번호 누락
- E_AUTH_001: 비밀번호 오류

---

### 5.2 사용자 (User) - 7개

#### 5.2.1 내 정보 조회

**GET** `/api/v1/users/me`

권한: member, admin

**요청 예시**

```bash
curl -X GET https://api.trend-korea.com/api/v1/users/me \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "user_123",
		"email": "user@example.com",
		"nickname": "testuser",
		"profileImage": "https://example.com/avatar.jpg",
		"role": "member",
		"socialProviders": ["kakao"],
		"trackedIssueIds": ["issue_1", "issue_2"],
		"savedEventIds": ["event_1"],
		"createdAt": "2026-02-01T10:30:00.000Z",
		"updatedAt": "2026-02-15T10:30:00.000Z"
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_AUTH_002: 토큰 만료

---

#### 5.2.2 내 정보 수정

**PATCH** `/api/v1/users/me`

권한: member, admin

**요청 파라미터**

| 이름         | 타입   | 필수 | 설명                  |
| ------------ | ------ | ---- | --------------------- |
| nickname     | string | X    | 닉네임 (2~20자, 유일) |
| profileImage | string | X    | 프로필 이미지 URL     |

**요청 예시**

```bash
curl -X PATCH https://api.trend-korea.com/api/v1/users/me \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "newusername",
    "profileImage": "https://example.com/new-avatar.jpg"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "user_123",
		"nickname": "newusername",
		"profileImage": "https://example.com/new-avatar.jpg",
		"updatedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "정보 수정 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_VALID_002: 닉네임 형식 오류
- E_CONFLICT_002: 닉네임 중복

---

#### 5.2.3 비밀번호 변경

**POST** `/api/v1/users/me/change-password`

권한: member, admin (이메일 가입 사용자만)

**요청 파라미터**

| 이름            | 타입   | 필수 |
| --------------- | ------ | ---- |
| currentPassword | string | O    |
| newPassword     | string | O    |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/users/me/change-password \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "OldPass123!",
    "newPassword": "NewPass456!"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": null,
	"message": "비밀번호 변경 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_AUTH_001: 현재 비밀번호 오류
- E_VALID_003: 비밀번호 복잡도 부족

---

#### 5.2.4 사용자 조회

**GET** `/api/v1/users/:userId`

권한: guest, member, admin

**URL 파라미터**

| 이름   | 타입   | 예시       |
| ------ | ------ | ---------- |
| userId | string | `user_123` |

**요청 예시**

```bash
curl -X GET https://api.trend-korea.com/api/v1/users/user_123
```

**성공 응답 (200 OK)**

공개 정보만 반환

```json
{
	"success": true,
	"data": {
		"id": "user_123",
		"nickname": "testuser",
		"profileImage": "https://example.com/avatar.jpg",
		"createdAt": "2026-02-01T10:30:00.000Z"
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_RESOURCE_001: 사용자 없음

---

#### 5.2.5 SNS 연동

**POST** `/api/v1/users/me/social-connect`

권한: member, admin

**요청 파라미터**

| 이름     | 타입   | 필수 | 예시                       |
| -------- | ------ | ---- | -------------------------- |
| provider | string | O    | `kakao`, `naver`, `google` |
| code     | string | O    | `authorization_code`       |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/users/me/social-connect \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "naver",
    "code": "xyz789"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"socialProviders": ["kakao", "naver"]
	},
	"message": "SNS 연동 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_CONFLICT_001: 이미 연동된 계정
- E_AUTH_001: SNS 인증 실패

---

#### 5.2.6 SNS 연동 해제

**DELETE** `/api/v1/users/me/social-disconnect`

권한: member, admin

**요청 파라미터**

| 이름     | 타입   | 필수 | 예시                       |
| -------- | ------ | ---- | -------------------------- |
| provider | string | O    | `kakao`, `naver`, `google` |

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/users/me/social-disconnect \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "naver"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"socialProviders": ["kakao"]
	},
	"message": "SNS 연동 해제 완료",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_VALID_001: provider 누락
- E_RESOURCE_001: 연동되지 않은 제공자

---

#### 5.2.7 사용자 활동 내역

**GET** `/api/v1/users/me/activity`

권한: member, admin

**쿼리 파라미터**

| 이름  | 타입   | 기본값 | 예시                         |
| ----- | ------ | ------ | ---------------------------- |
| page  | number | 1      | `1`                          |
| limit | number | 10     | `10`                         |
| type  | string | `all`  | `posts`, `comments`, `likes` |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/users/me/activity?page=1&limit=10&type=posts" \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"items": [
			{
				"id": "post_1",
				"type": "post",
				"title": "게시글 제목",
				"createdAt": "2026-02-15T10:30:00.000Z"
			}
		],
		"pagination": {
			"currentPage": 1,
			"totalPages": 5,
			"totalItems": 42,
			"itemsPerPage": 10,
			"hasNext": true,
			"hasPrev": false
		}
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_VALID_001: 유효하지 않은 페이지 번호

---

### 5.3 사건 (Event) - 7개

#### 5.3.1 사건 목록 조회 (타임라인)

**GET** `/api/v1/events`

권한: guest, member, admin

**쿼리 파라미터**

| 이름       | 타입   | 기본값       | 예시                  | 설명                       |
| ---------- | ------ | ------------ | --------------------- | -------------------------- |
| cursor     | string | -            | `eyJpZCI6IjEwMCJ9...` | 커서 기반 페이지네이션     |
| limit      | number | 10           | `20`                  | 한 페이지 항목 수          |
| categories | string | -            | `정치,경제`           | 분야 필터 (쉼표로 구분)    |
| regions    | string | -            | `서울,경기`           | 지역 필터                  |
| importance | string | -            | `high`                | 중요도 (high, medium, low) |
| startDate  | string | -            | `2026-01-01`          | 시작 날짜 (ISO 8601)       |
| endDate    | string | -            | `2026-02-15`          | 종료 날짜                  |
| sortBy     | string | `occurredAt` | `importance`          | 정렬 필드                  |
| order      | string | `desc`       | `asc`, `desc`         | 정렬 순서                  |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/events?limit=10&categories=정치&importance=high" \
  -H "Accept: application/json"
```

**성공 응답 (200 OK) - Cursor-based**

```json
{
	"success": true,
	"data": {
		"items": [
			{
				"id": "event_1",
				"occurredAt": "2026-02-15T10:30:00.000Z",
				"title": "서울시장 선거 결과 발표",
				"summary": "2026년 서울시장 선거 결과가 발표되었습니다.",
				"tags": [{ "id": "tag_1", "name": "정치", "type": "category" }],
				"sources": [
					{
						"url": "https://news.example.com/123",
						"title": "서울시장 선거 결과",
						"publisher": "뉴스사",
						"publishedAt": "2026-02-15T10:00:00.000Z"
					}
				],
				"importance": "high",
				"verificationStatus": "verified",
				"relatedIssueIds": ["issue_1"]
			}
		],
		"cursor": {
			"next": "eyJpZCI6IjEwMCIsImRhdGUiOiIyMDI2LTAyLTE1In0=",
			"hasMore": true
		}
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_VALID_001: 유효하지 않은 필터
- E_VALID_002: 날짜 형식 오류

---

#### 5.3.2 사건 상세 조회

**GET** `/api/v1/events/:eventId`

권한: guest, member, admin

**URL 파라미터**

| 이름    | 타입   | 예시      |
| ------- | ------ | --------- |
| eventId | string | `event_1` |

**요청 예시**

```bash
curl -X GET https://api.trend-korea.com/api/v1/events/event_1
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "event_1",
		"occurredAt": "2026-02-15T10:30:00.000Z",
		"title": "서울시장 선거 결과 발표",
		"summary": "2026년 서울시장 선거 결과가 발표되었습니다.",
		"tags": [
			{ "id": "tag_1", "name": "정치", "type": "category" },
			{ "id": "tag_2", "name": "서울", "type": "region" }
		],
		"sources": [
			{
				"url": "https://news.example.com/123",
				"title": "서울시장 선거 결과",
				"publisher": "뉴스사",
				"publishedAt": "2026-02-15T10:00:00.000Z"
			}
		],
		"importance": "high",
		"verificationStatus": "verified",
		"relatedIssueIds": ["issue_1", "issue_2"],
		"createdAt": "2026-02-15T10:30:00.000Z",
		"updatedAt": "2026-02-15T10:30:00.000Z"
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_RESOURCE_001: 사건 없음

---

#### 5.3.3 사건 생성 (관리자)

**POST** `/api/v1/events`

권한: admin

**요청 파라미터**

| 이름               | 타입   | 필수 | 제약                 | 예시                       |
| ------------------ | ------ | ---- | -------------------- | -------------------------- |
| occurredAt         | string | O    | ISO 8601             | `2026-02-15T10:30:00.000Z` |
| title              | string | O    | 최대 50자            | `서울시장 선거 결과`       |
| summary            | string | O    | 2~3줄                | `2026년 서울시장...        |
| importance         | string | O    | high, medium, low    | `high`                     |
| verificationStatus | string | O    | verified, unverified | `verified`                 |
| tagIds             | array  | O    | 최대 3개             | `["tag_1", "tag_2"]`       |
| sourceIds          | array  | O    | 최소 1개             | `["source_1"]`             |
| relatedIssueIds    | array  | X    |                      | `["issue_1"]`              |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/events \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "occurredAt": "2026-02-15T10:30:00.000Z",
    "title": "서울시장 선거 결과 발표",
    "summary": "2026년 서울시장 선거 결과가 발표되었습니다.",
    "importance": "high",
    "verificationStatus": "verified",
    "tagIds": ["tag_1", "tag_2"],
    "sourceIds": ["source_1"],
    "relatedIssueIds": ["issue_1"]
  }'
```

**성공 응답 (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "event_1",
    "occurredAt": "2026-02-15T10:30:00.000Z",
    "title": "서울시장 선거 결과 발표",
    "summary": "2026년 서울시장 선거 결과가 발표되었습니다.",
    "tags": [...],
    "sources": [...],
    "importance": "high",
    "verificationStatus": "verified",
    "relatedIssueIds": ["issue_1"],
    "createdAt": "2026-02-15T10:30:00.000Z"
  },
  "message": "사건 생성 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_PERM_001: 관리자 권한 없음
- E_VALID_001: 필수 필드 누락
- E_VALID_002: 필드 형식 오류
- E_RESOURCE_001: 태그/출처 없음

---

#### 5.3.4 사건 수정 (관리자)

**PATCH** `/api/v1/events/:eventId`

권한: admin

**URL 파라미터**

| 이름    | 타입   | 예시      |
| ------- | ------ | --------- |
| eventId | string | `event_1` |

**요청 파라미터** (모두 선택적)

| 이름               | 타입   | 제약                 |
| ------------------ | ------ | -------------------- |
| title              | string | 최대 50자            |
| summary            | string | 2~3줄                |
| importance         | string | high, medium, low    |
| verificationStatus | string | verified, unverified |
| tagIds             | array  | 최대 3개             |
| sourceIds          | array  | 최소 1개             |
| relatedIssueIds    | array  |                      |

**요청 예시**

```bash
curl -X PATCH https://api.trend-korea.com/api/v1/events/event_1 \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "수정된 제목",
    "importance": "medium"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "event_1",
		"title": "수정된 제목",
		"importance": "medium",
		"updatedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "사건 수정 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_PERM_001: 관리자 권한 없음
- E_RESOURCE_001: 사건 없음
- E_VALID_002: 필드 형식 오류

---

#### 5.3.5 사건 삭제 (관리자)

**DELETE** `/api/v1/events/:eventId`

권한: admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/events/event_1 \
  -H "Authorization: Bearer {adminToken}"
```

**성공 응답 (204 No Content 또는 200 OK)**

```json
{
	"success": true,
	"data": null,
	"message": "사건 삭제 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_PERM_001: 관리자 권한 없음
- E_RESOURCE_001: 사건 없음

---

#### 5.3.6 사건 저장

**POST** `/api/v1/events/:eventId/save`

권한: member, admin

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/events/event_1/save \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"eventId": "event_1",
		"isSaved": true,
		"savedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "사건 저장 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_RESOURCE_001: 사건 없음

---

#### 5.3.7 사건 저장 해제

**DELETE** `/api/v1/events/:eventId/save`

권한: member, admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/events/event_1/save \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (204 No Content 또는 200 OK)**

```json
{
	"success": true,
	"data": null,
	"message": "사건 저장 해제 완료",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_RESOURCE_001: 사건 없음

---

### 5.4 이슈 (Issue) - 6개

#### 5.4.1 이슈 목록 조회

**GET** `/api/v1/issues`

권한: guest, member, admin

**쿼리 파라미터**

| 이름       | 타입   | 기본값      | 예시                        |
| ---------- | ------ | ----------- | --------------------------- |
| page       | number | 1           | `1`                         |
| limit      | number | 10          | `10`                        |
| status     | string | -           | `ongoing,closed`            |
| categories | string | -           | `정치,경제`                 |
| startDate  | string | -           | `2026-01-01`                |
| endDate    | string | -           | `2026-02-15`                |
| sortBy     | string | `updatedAt` | `trackerCount`, `createdAt` |
| order      | string | `desc`      | `asc`                       |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/issues?page=1&limit=10&status=ongoing"
```

**성공 응답 (200 OK) - Offset-based**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "issue_1",
        "title": "서울 지하철 파업",
        "description": "2026년 서울 지하철 노조 파업 진행 상황...",
        "status": "ongoing",
        "tags": [
          { "id": "tag_3", "name": "노동", "type": "category" }
        ],
        "triggers": [
          {
            "id": "trigger_1",
            "occurredAt": "2026-02-15T10:30:00.000Z",
            "summary": "노조와 경영진 재협상 예정",
            "type": "announcement"
          }
        ],
        "trackerCount": 1234,
        "relatedEventIds": ["event_1", "event_2"],
        "sources": [...],
        "createdAt": "2026-02-01T10:30:00.000Z",
        "updatedAt": "2026-02-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 15,
      "totalItems": 142,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "조회 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_VALID_001: 유효하지 않은 필터
- E_VALID_002: 날짜 형식 오류

---

#### 5.4.2 이슈 상세 조회

**GET** `/api/v1/issues/:issueId`

권한: guest, member, admin

**URL 파라미터**

| 이름    | 타입   | 예시      |
| ------- | ------ | --------- |
| issueId | string | `issue_1` |

**요청 예시**

```bash
curl -X GET https://api.trend-korea.com/api/v1/issues/issue_1
```

**성공 응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "issue_1",
    "title": "서울 지하철 파업",
    "description": "2026년 서울 지하철 노조 파업 진행 상황...",
    "status": "ongoing",
    "tags": [
      { "id": "tag_3", "name": "노동", "type": "category" },
      { "id": "tag_2", "name": "서울", "type": "region" }
    ],
    "triggers": [
      {
        "id": "trigger_1",
        "issueId": "issue_1",
        "occurredAt": "2026-02-15T10:30:00.000Z",
        "summary": "노조와 경영진 재협상 예정",
        "type": "announcement",
        "sources": [...]
      }
    ],
    "trackerCount": 1234,
    "relatedEventIds": ["event_1"],
    "sources": [...],
    "createdAt": "2026-02-01T10:30:00.000Z",
    "updatedAt": "2026-02-15T10:30:00.000Z"
  },
  "message": "조회 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_RESOURCE_002: 이슈 없음

---

#### 5.4.3 이슈 생성 (관리자)

**POST** `/api/v1/issues`

권한: admin

**요청 파라미터**

| 이름            | 타입   | 필수 | 제약                                   |
| --------------- | ------ | ---- | -------------------------------------- |
| title           | string | O    | 최대 50자                              |
| description     | string | O    |                                        |
| status          | string | O    | ongoing, closed, reignited, unverified |
| tagIds          | array  | O    | 최대 3개                               |
| sourceIds       | array  | O    | 최소 1개                               |
| relatedEventIds | array  | X    |                                        |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/issues \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "서울 지하철 파업",
    "description": "2026년 서울 지하철 노조 파업...",
    "status": "ongoing",
    "tagIds": ["tag_3"],
    "sourceIds": ["source_1"],
    "relatedEventIds": ["event_1"]
  }'
```

**성공 응답 (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "issue_1",
    "title": "서울 지하철 파업",
    "description": "2026년 서울 지하철 노조 파업...",
    "status": "ongoing",
    "tags": [...],
    "triggers": [],
    "trackerCount": 0,
    "relatedEventIds": ["event_1"],
    "sources": [...],
    "createdAt": "2026-02-15T10:30:00.000Z"
  },
  "message": "이슈 생성 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_PERM_001: 관리자 권한 없음
- E_VALID_001: 필수 필드 누락
- E_RESOURCE_001: 태그/출처 없음

---

#### 5.4.4 이슈 수정 (관리자)

**PATCH** `/api/v1/issues/:issueId`

권한: admin

**요청 파라미터** (모두 선택적)

| 이름            | 타입   |
| --------------- | ------ |
| title           | string |
| description     | string |
| status          | string |
| tagIds          | array  |
| sourceIds       | array  |
| relatedEventIds | array  |

**요청 예시**

```bash
curl -X PATCH https://api.trend-korea.com/api/v1/issues/issue_1 \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "closed"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "issue_1",
		"status": "closed",
		"updatedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "이슈 수정 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_PERM_001: 관리자 권한 없음
- E_RESOURCE_002: 이슈 없음

---

#### 5.4.5 이슈 삭제 (관리자)

**DELETE** `/api/v1/issues/:issueId`

권한: admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/issues/issue_1 \
  -H "Authorization: Bearer {adminToken}"
```

**성공 응답 (204 No Content)**

```json
{
	"success": true,
	"data": null,
	"message": "이슈 삭제 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_PERM_001: 관리자 권한 없음
- E_RESOURCE_002: 이슈 없음

---

#### 5.4.6 이슈 추적

**POST** `/api/v1/issues/:issueId/track`

권한: member, admin

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/issues/issue_1/track \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"issueId": "issue_1",
		"isTracking": true,
		"trackedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "이슈 추적 시작",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_RESOURCE_002: 이슈 없음
- E_CONFLICT_002: 이미 추적 중

---

### 5.5 트리거 (Trigger) - 4개

#### 5.5.1 트리거 목록 조회

**GET** `/api/v1/issues/:issueId/triggers`

권한: guest, member, admin

**URL 파라미터**

| 이름    | 타입   |
| ------- | ------ |
| issueId | string |

**쿼리 파라미터**

| 이름   | 타입   | 기본값       |
| ------ | ------ | ------------ |
| sortBy | string | `occurredAt` |
| order  | string | `desc`       |

**요청 예시**

```bash
curl -X GET https://api.trend-korea.com/api/v1/issues/issue_1/triggers
```

**성공 응답 (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "id": "trigger_1",
      "issueId": "issue_1",
      "occurredAt": "2026-02-15T10:30:00.000Z",
      "summary": "노조와 경영진 재협상 예정",
      "type": "announcement",
      "sources": [...]
    }
  ],
  "message": "조회 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.5.2 트리거 생성 (관리자)

**POST** `/api/v1/issues/:issueId/triggers`

권한: admin

**요청 파라미터**

| 이름       | 타입   | 필수 | 예시                                                               |
| ---------- | ------ | ---- | ------------------------------------------------------------------ |
| occurredAt | string | O    | `2026-02-15T10:30:00.000Z`                                         |
| summary    | string | O    | `노조와 경영진 재협상 예정`                                        |
| type       | string | O    | `article`, `ruling`, `announcement`, `correction`, `status_change` |
| sourceIds  | array  | O    | `["source_1"]`                                                     |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/issues/issue_1/triggers \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "occurredAt": "2026-02-15T10:30:00.000Z",
    "summary": "노조와 경영진 재협상 예정",
    "type": "announcement",
    "sourceIds": ["source_1"]
  }'
```

**성공 응답 (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "trigger_1",
    "issueId": "issue_1",
    "occurredAt": "2026-02-15T10:30:00.000Z",
    "summary": "노조와 경영진 재협상 예정",
    "type": "announcement",
    "sources": [...]
  },
  "message": "트리거 생성 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.5.3 트리거 수정 (관리자)

**PATCH** `/api/v1/triggers/:triggerId`

권한: admin

**요청 파라미터** (선택적)

| 이름      | 타입   |
| --------- | ------ |
| summary   | string |
| type      | string |
| sourceIds | array  |

**요청 예시**

```bash
curl -X PATCH https://api.trend-korea.com/api/v1/triggers/trigger_1 \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "summary": "수정된 요약"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "trigger_1",
		"summary": "수정된 요약",
		"updatedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "트리거 수정 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

#### 5.5.4 트리거 삭제 (관리자)

**DELETE** `/api/v1/triggers/:triggerId`

권한: admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/triggers/trigger_1 \
  -H "Authorization: Bearer {adminToken}"
```

**성공 응답 (204 No Content)**

```json
{
	"success": true,
	"data": null,
	"message": "트리거 삭제 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

### 5.6 게시글 (Post) - 6개

#### 5.6.1 게시글 목록 조회

**GET** `/api/v1/posts`

권한: guest, member, admin

**쿼리 파라미터**

| 이름       | 타입   | 기본값      | 예시                       |
| ---------- | ------ | ----------- | -------------------------- |
| cursor     | string | -           | `eyJpZCI6IjEwMCJ9...`      |
| limit      | number | 10          | `20`                       |
| tab        | string | `latest`    | `latest`, `popular`, `hot` |
| categories | string | -           | `정치,경제`                |
| sortBy     | string | `createdAt` | `likeCount`                |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/posts?tab=popular&limit=10"
```

**성공 응답 (200 OK) - Cursor-based**

```json
{
	"success": true,
	"data": {
		"items": [
			{
				"id": "post_1",
				"authorId": "user_123",
				"authorNickname": "testuser",
				"authorImage": "https://example.com/avatar.jpg",
				"title": "지하철 파업 관련 의견",
				"content": "# 제목\n\n본문 마크다운...",
				"tags": [{ "id": "tag_3", "name": "노동", "type": "category" }],
				"isAnonymous": false,
				"likeCount": 45,
				"dislikeCount": 3,
				"commentCount": 12,
				"createdAt": "2026-02-15T10:30:00.000Z",
				"updatedAt": "2026-02-15T10:30:00.000Z"
			}
		],
		"cursor": {
			"next": "eyJpZCI6IjEwMCJ9...",
			"hasMore": true
		}
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.6.2 게시글 상세 조회

**GET** `/api/v1/posts/:postId`

권한: guest, member, admin

**URL 파라미터**

| 이름   | 타입   |
| ------ | ------ |
| postId | string |

**요청 예시**

```bash
curl -X GET https://api.trend-korea.com/api/v1/posts/post_1
```

**성공 응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "post_1",
    "authorId": "user_123",
    "authorNickname": "testuser",
    "authorImage": "https://example.com/avatar.jpg",
    "title": "지하철 파업 관련 의견",
    "content": "# 제목\n\n본문 마크다운...",
    "tags": [...],
    "isAnonymous": false,
    "likeCount": 45,
    "dislikeCount": 3,
    "commentCount": 12,
    "createdAt": "2026-02-15T10:30:00.000Z",
    "updatedAt": "2026-02-15T10:30:00.000Z",
    "isAuthor": true,
    "userLiked": true
  },
  "message": "조회 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.6.3 게시글 생성

**POST** `/api/v1/posts`

권한: member, admin

**요청 파라미터**

| 이름        | 타입    | 필수 | 제약       |
| ----------- | ------- | ---- | ---------- |
| title       | string  | O    | 최대 100자 |
| content     | string  | O    | 마크다운   |
| tagIds      | array   | X    | 최대 3개   |
| isAnonymous | boolean | O    |            |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/posts \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "지하철 파업 관련 의견",
    "content": "# 제목\n\n본문...",
    "tagIds": ["tag_3"],
    "isAnonymous": false
  }'
```

**성공 응답 (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "post_1",
    "authorId": "user_123",
    "authorNickname": "testuser",
    "title": "지하철 파업 관련 의견",
    "content": "...",
    "tags": [...],
    "isAnonymous": false,
    "likeCount": 0,
    "dislikeCount": 0,
    "commentCount": 0,
    "createdAt": "2026-02-15T10:30:00.000Z"
  },
  "message": "게시글 생성 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_VALID_001: 필수 필드 누락

---

#### 5.6.4 게시글 수정

**PATCH** `/api/v1/posts/:postId`

권한: 작성자 본인, admin

**요청 파라미터**

| 이름    | 타입   | 필수 |
| ------- | ------ | ---- |
| title   | string | X    |
| content | string | X    |
| tagIds  | array  | X    |

**요청 예시**

```bash
curl -X PATCH https://api.trend-korea.com/api/v1/posts/post_1 \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "수정된 제목"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "post_1",
		"title": "수정된 제목",
		"updatedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "게시글 수정 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

**에러 케이스**

- E_AUTH_001: 토큰 없음
- E_PERM_001: 작성자가 아님

---

#### 5.6.5 게시글 삭제

**DELETE** `/api/v1/posts/:postId`

권한: 작성자 본인, admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/posts/post_1 \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (204 No Content)**

```json
{
	"success": true,
	"data": null,
	"message": "게시글 삭제 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

#### 5.6.6 게시글 추천/비추천

**POST** `/api/v1/posts/:postId/like`

권한: member, admin

**요청 파라미터**

| 이름 | 타입   | 필수 | 예시              |
| ---- | ------ | ---- | ----------------- |
| type | string | O    | `like`, `dislike` |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/posts/post_1/like \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "like"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"postId": "post_1",
		"type": "like",
		"likeCount": 46,
		"dislikeCount": 3,
		"userAction": "like"
	},
	"message": "추천 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

### 5.7 댓글 (Comment) - 6개

#### 5.7.1 댓글 목록 조회

**GET** `/api/v1/posts/:postId/comments`

권한: guest, member, admin

**URL 파라미터**

| 이름   | 타입   |
| ------ | ------ |
| postId | string |

**쿼리 파라미터**

| 이름   | 타입   | 기본값      |
| ------ | ------ | ----------- |
| sortBy | string | `createdAt` |
| order  | string | `desc`      |

**요청 예시**

```bash
curl -X GET https://api.trend-korea.com/api/v1/posts/post_1/comments
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"id": "comment_1",
			"postId": "post_1",
			"parentId": null,
			"authorId": "user_124",
			"authorNickname": "commenter",
			"content": "좋은 의견이네요",
			"likeCount": 5,
			"createdAt": "2026-02-15T10:35:00.000Z",
			"updatedAt": "2026-02-15T10:35:00.000Z",
			"replies": [
				{
					"id": "comment_2",
					"postId": "post_1",
					"parentId": "comment_1",
					"authorId": "user_125",
					"authorNickname": "reply_user",
					"content": "저도 동의합니다",
					"likeCount": 2,
					"createdAt": "2026-02-15T10:40:00.000Z",
					"updatedAt": "2026-02-15T10:40:00.000Z"
				}
			]
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.7.2 댓글 생성

**POST** `/api/v1/posts/:postId/comments`

권한: member, admin

**요청 파라미터**

| 이름     | 타입   | 필수 | 설명                       |
| -------- | ------ | ---- | -------------------------- |
| content  | string | O    | 댓글 내용                  |
| parentId | string | X    | 대댓글인 경우 부모 댓글 ID |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/posts/post_1/comments \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "좋은 의견이네요",
    "parentId": null
  }'
```

**성공 응답 (201 Created)**

```json
{
	"success": true,
	"data": {
		"id": "comment_1",
		"postId": "post_1",
		"parentId": null,
		"authorId": "user_124",
		"authorNickname": "commenter",
		"content": "좋은 의견이네요",
		"likeCount": 0,
		"createdAt": "2026-02-15T10:35:00.000Z"
	},
	"message": "댓글 생성 성공",
	"timestamp": "2026-02-15T10:35:00.000Z"
}
```

---

#### 5.7.3 댓글 수정

**PATCH** `/api/v1/comments/:commentId`

권한: 작성자 본인, admin

**요청 파라미터**

| 이름    | 타입   | 필수 |
| ------- | ------ | ---- |
| content | string | O    |

**요청 예시**

```bash
curl -X PATCH https://api.trend-korea.com/api/v1/comments/comment_1 \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "수정된 댓글 내용"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "comment_1",
		"content": "수정된 댓글 내용",
		"updatedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "댓글 수정 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

#### 5.7.4 댓글 삭제

**DELETE** `/api/v1/comments/:commentId`

권한: 작성자 본인, admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/comments/comment_1 \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (204 No Content)**

```json
{
	"success": true,
	"data": null,
	"message": "댓글 삭제 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

#### 5.7.5 댓글 좋아요

**POST** `/api/v1/comments/:commentId/like`

권한: member, admin

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/comments/comment_1/like \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"commentId": "comment_1",
		"likeCount": 6,
		"userLiked": true
	},
	"message": "좋아요 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

#### 5.7.6 댓글 좋아요 취소

**DELETE** `/api/v1/comments/:commentId/like`

권한: member, admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/comments/comment_1/like \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"commentId": "comment_1",
		"likeCount": 5,
		"userLiked": false
	},
	"message": "좋아요 취소 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

### 5.8 태그 (Tag) - 4개

#### 5.8.1 태그 목록 조회

**GET** `/api/v1/tags`

권한: guest, member, admin

**쿼리 파라미터**

| 이름   | 타입   | 기본값 | 예시                 |
| ------ | ------ | ------ | -------------------- |
| type   | string | `all`  | `category`, `region` |
| search | string | -      | `정치`               |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/tags?type=category"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"id": "tag_1",
			"name": "정치",
			"type": "category",
			"slug": "politics"
		},
		{
			"id": "tag_2",
			"name": "경제",
			"type": "category",
			"slug": "economy"
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.8.2 태그 생성 (관리자)

**POST** `/api/v1/tags`

권한: admin

**요청 파라미터**

| 이름 | 타입   | 필수 |
| ---- | ------ | ---- |
| name | string | O    |
| type | string | O    |
| slug | string | O    |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/tags \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "정치",
    "type": "category",
    "slug": "politics"
  }'
```

**성공 응답 (201 Created)**

```json
{
	"success": true,
	"data": {
		"id": "tag_1",
		"name": "정치",
		"type": "category",
		"slug": "politics"
	},
	"message": "태그 생성 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.8.3 태그 수정 (관리자)

**PATCH** `/api/v1/tags/:tagId`

권한: admin

**요청 파라미터**

| 이름 | 타입   |
| ---- | ------ |
| name | string |
| slug | string |

**요청 예시**

```bash
curl -X PATCH https://api.trend-korea.com/api/v1/tags/tag_1 \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "정치/정책"
  }'
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"id": "tag_1",
		"name": "정치/정책",
		"updatedAt": "2026-02-15T10:45:00.000Z"
	},
	"message": "태그 수정 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

#### 5.8.4 태그 삭제 (관리자)

**DELETE** `/api/v1/tags/:tagId`

권한: admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/tags/tag_1 \
  -H "Authorization: Bearer {adminToken}"
```

**성공 응답 (204 No Content)**

```json
{
	"success": true,
	"data": null,
	"message": "태그 삭제 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

### 5.9 출처 (Source) - 3개

#### 5.9.1 출처 목록 조회

**GET** `/api/v1/sources`

권한: guest, member, admin

**쿼리 파라미터**

| 이름      | 타입   | 기본값 |
| --------- | ------ | ------ |
| page      | number | 1      |
| limit     | number | 10     |
| publisher | string | -      |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/sources?page=1"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"items": [
			{
				"url": "https://news.example.com/123",
				"title": "서울시장 선거 결과",
				"publisher": "뉴스사",
				"publishedAt": "2026-02-15T10:00:00.000Z"
			}
		],
		"pagination": {
			"currentPage": 1,
			"totalPages": 10,
			"totalItems": 95,
			"itemsPerPage": 10,
			"hasNext": true,
			"hasPrev": false
		}
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.9.2 출처 생성 (관리자)

**POST** `/api/v1/sources`

권한: admin

**요청 파라미터**

| 이름        | 타입   | 필수 |
| ----------- | ------ | ---- |
| url         | string | O    |
| title       | string | O    |
| publisher   | string | O    |
| publishedAt | string | O    |

**요청 예시**

```bash
curl -X POST https://api.trend-korea.com/api/v1/sources \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://news.example.com/123",
    "title": "서울시장 선거 결과",
    "publisher": "뉴스사",
    "publishedAt": "2026-02-15T10:00:00.000Z"
  }'
```

**성공 응답 (201 Created)**

```json
{
	"success": true,
	"data": {
		"url": "https://news.example.com/123",
		"title": "서울시장 선거 결과",
		"publisher": "뉴스사",
		"publishedAt": "2026-02-15T10:00:00.000Z"
	},
	"message": "출처 생성 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.9.3 출처 삭제 (관리자)

**DELETE** `/api/v1/sources/:sourceId`

권한: admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/sources/source_1 \
  -H "Authorization: Bearer {adminToken}"
```

**성공 응답 (204 No Content)**

```json
{
	"success": true,
	"data": null,
	"message": "출처 삭제 성공",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

### 5.10 추적 (Tracking) - 4개

#### 5.10.1 추적 중인 이슈 조회

**GET** `/api/v1/users/me/tracked-issues`

권한: member, admin

**쿼리 파라미터**

| 이름   | 타입   | 기본값      |
| ------ | ------ | ----------- |
| page   | number | 1           |
| limit  | number | 10          |
| sortBy | string | `trackedAt` |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/users/me/tracked-issues?page=1" \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"items": [
			{
				"id": "issue_1",
				"title": "서울 지하철 파업",
				"status": "ongoing",
				"trackerCount": 1234,
				"latestTrigger": {
					"summary": "노조와 경영진 재협상 예정",
					"occurredAt": "2026-02-15T10:30:00.000Z"
				},
				"trackedAt": "2026-02-10T10:30:00.000Z",
				"isNew": true
			}
		],
		"pagination": {
			"currentPage": 1,
			"totalPages": 1,
			"totalItems": 2,
			"itemsPerPage": 10,
			"hasNext": false,
			"hasPrev": false
		}
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.10.2 저장한 사건 조회

**GET** `/api/v1/users/me/saved-events`

권한: member, admin

**쿼리 파라미터**

| 이름   | 타입   | 기본값    |
| ------ | ------ | --------- |
| page   | number | 1         |
| limit  | number | 10        |
| sortBy | string | `savedAt` |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/users/me/saved-events?page=1" \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "event_1",
        "occurredAt": "2026-02-15T10:30:00.000Z",
        "title": "서울시장 선거 결과 발표",
        "importance": "high",
        "tags": [...],
        "savedAt": "2026-02-12T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 1,
      "itemsPerPage": 10,
      "hasNext": false,
      "hasPrev": false
    }
  },
  "message": "조회 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.10.3 이슈 추적 해제

**DELETE** `/api/v1/issues/:issueId/track`

권한: member, admin

**요청 예시**

```bash
curl -X DELETE https://api.trend-korea.com/api/v1/issues/issue_1/track \
  -H "Authorization: Bearer {accessToken}"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": null,
	"message": "이슈 추적 해제 완료",
	"timestamp": "2026-02-15T10:45:00.000Z"
}
```

---

#### 5.10.4 사건 저장 해제

**DELETE** `/api/v1/events/:eventId/save`

권한: member, admin

_(이미 5.3.7에서 명시)_

---

### 5.11 검색 (Search) - 4개

#### 5.11.1 통합 검색

**GET** `/api/v1/search`

권한: guest, member, admin

**쿼리 파라미터**

| 이름       | 타입   | 필수 | 예시                                   |
| ---------- | ------ | ---- | -------------------------------------- |
| q          | string | O    | `지하철`                               |
| page       | number | X    | `1`                                    |
| limit      | number | X    | `10`                                   |
| tab        | string | X    | `all`, `events`, `issues`, `community` |
| categories | string | X    | `노동,정치`                            |
| startDate  | string | X    | `2026-01-01`                           |
| endDate    | string | X    | `2026-02-15`                           |
| sortBy     | string | X    | `relevance`, `latest`, `popular`       |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/search?q=지하철&tab=all&page=1"
```

**성공 응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "issue_1",
        "type": "issue",
        "title": "서울 지하철 파업",
        "summary": "2026년 서울 지하철 노조 파업...",
        "date": "2026-02-15T10:30:00.000Z",
        "tags": [...]
      },
      {
        "id": "post_1",
        "type": "post",
        "title": "지하철 파업 관련 의견",
        "summary": "댓글이 많은 게시글...",
        "date": "2026-02-15T10:30:00.000Z",
        "tags": [...]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 42,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "검색 성공",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

**에러 케이스**

- E_VALID_001: 검색어 누락

---

#### 5.11.2 사건 검색

**GET** `/api/v1/search/events`

권한: guest, member, admin

**쿼리 파라미터** (통합 검색과 동일)

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/search/events?q=지하철"
```

**성공 응답 (200 OK)**

사건만 필터링된 결과

---

#### 5.11.3 이슈 검색

**GET** `/api/v1/search/issues`

권한: guest, member, admin

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/search/issues?q=지하철"
```

**성공 응답 (200 OK)**

이슈만 필터링된 결과

---

#### 5.11.4 게시글 검색

**GET** `/api/v1/search/posts`

권한: guest, member, admin

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/search/posts?q=지하철"
```

**성공 응답 (200 OK)**

게시글만 필터링된 결과

---

### 5.12 홈 (Home) - 7개

#### 5.12.1 속보 (Breaking News)

**GET** `/api/v1/home/breaking-news`

권한: guest, member, admin

**쿼리 파라미터**

| 이름  | 타입   | 기본값 |
| ----- | ------ | ------ |
| limit | number | 10     |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/home/breaking-news?limit=10"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"id": "event_1",
			"number": 1,
			"time": "10:30",
			"title": "서울시장 선거 결과 발표",
			"summary": "2026년 서울시장 선거 결과가...",
			"tags": ["정치", "서울"],
			"importance": "high"
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.12.2 핫 게시물 (Hot Posts)

**GET** `/api/v1/home/hot-posts`

권한: guest, member, admin

**쿼리 파라미터**

| 이름   | 타입   | 기본값 |
| ------ | ------ | ------ |
| limit  | number | 5      |
| period | string | `24h`  |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/home/hot-posts?limit=5"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"id": "post_1",
			"number": 1,
			"title": "지하철 파업 관련 의견",
			"category": "노동",
			"commentCount": 45,
			"author": "testuser",
			"createdAt": "2026-02-15T10:30:00.000Z",
			"isHot": true
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.12.3 검색순위 (Search Rankings)

**GET** `/api/v1/home/search-rankings`

권한: guest, member, admin

**쿼리 파라미터**

| 이름   | 타입   | 기본값 |
| ------ | ------ | ------ |
| limit  | number | 10     |
| period | string | `1h`   |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/home/search-rankings?limit=10"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"rank": 1,
			"keyword": "지하철",
			"change": "up",
			"changeAmount": 5
		},
		{
			"rank": 2,
			"keyword": "파업",
			"change": "steady",
			"changeAmount": 0
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.12.4 트렌드 (Trending Issues/Tags)

**GET** `/api/v1/home/trending`

권한: guest, member, admin

**쿼리 파라미터**

| 이름   | 타입   | 기본값 | 예시        |
| ------ | ------ | ------ | ----------- |
| limit  | number | 5      | `5`         |
| period | string | `24h`  | `7d`, `30d` |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/home/trending?period=24h&limit=5"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"id": "issue_1",
			"rank": 1,
			"title": "서울 지하철 파업",
			"changeRate": "+25%",
			"tags": ["노동", "서울"],
			"summary": "2026년 서울 지하철 노조 파업..."
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.12.5 타임라인 미니맵 (Timeline Minimap)

**GET** `/api/v1/home/timeline-minimap`

권한: guest, member, admin

**쿼리 파라미터**

| 이름 | 타입   | 기본값 |
| ---- | ------ | ------ |
| days | number | 7      |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/home/timeline-minimap?days=7"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": {
		"dates": [
			{
				"date": "2026-02-15",
				"eventCount": 8,
				"density": "high"
			},
			{
				"date": "2026-02-14",
				"eventCount": 3,
				"density": "low"
			}
		]
	},
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.12.6 주요 뉴스 (Featured News)

**GET** `/api/v1/home/featured-news`

권한: guest, member, admin

**쿼리 파라미터**

| 이름  | 타입   | 기본값 |
| ----- | ------ | ------ |
| limit | number | 5      |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/home/featured-news?limit=5"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"id": "news_1",
			"author": "뉴스기자",
			"authorImage": "https://example.com/avatar.jpg",
			"title": "뉴스 제목",
			"summary": "뉴스 요약...",
			"imageUrl": "https://example.com/image.jpg",
			"createdAt": "2026-02-15T10:30:00.000Z"
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

#### 5.12.7 커뮤니티 미디어 (Community Media)

**GET** `/api/v1/home/community-media`

권한: guest, member, admin

**쿼리 파라미터**

| 이름  | 타입   | 기본값 |
| ----- | ------ | ------ |
| limit | number | 6      |

**요청 예시**

```bash
curl -X GET "https://api.trend-korea.com/api/v1/home/community-media?limit=6"
```

**성공 응답 (200 OK)**

```json
{
	"success": true,
	"data": [
		{
			"id": "media_1",
			"title": "커뮤니티 미디어 제목",
			"imageUrl": "https://example.com/media.jpg",
			"viewCount": 1234,
			"createdAt": "2026-02-15T10:30:00.000Z"
		}
	],
	"message": "조회 성공",
	"timestamp": "2026-02-15T10:30:00.000Z"
}
```

---

## 6. 데이터 모델

### 6.1 Event (사건)

```typescript
type Event = {
	id: string; // 고유 ID
	occurredAt: string; // 발생 일시 (ISO 8601 UTC)
	title: string; // 제목 (최대 50자)
	summary: string; // 요약 (2~3줄)
	tags: Tag[]; // 태그 목록 (최대 3개)
	sources: Source[]; // 출처 목록 (최소 1개)
	importance: "high" | "medium" | "low"; // 중요도
	verificationStatus: "verified" | "unverified"; // 검증 상태
	relatedIssueIds: string[]; // 관련 이슈 ID 배열
	createdAt: string; // 생성 일시
	updatedAt: string; // 수정 일시
};
```

### 6.2 Issue (이슈)

```typescript
type Issue = {
	id: string;
	title: string; // 제목 (최대 50자)
	description: string; // 설명
	status: "ongoing" | "closed" | "reignited" | "unverified"; // 상태
	tags: Tag[];
	triggers: Trigger[]; // 트리거 목록
	trackerCount: number; // 추적자 수
	relatedEventIds: string[]; // 관련 사건 ID
	sources: Source[];
	createdAt: string;
	updatedAt: string;
};
```

### 6.3 Trigger (트리거)

```typescript
type Trigger = {
	id: string;
	issueId: string;
	occurredAt: string; // 발생 일시
	summary: string; // 변경 요약
	type: "article" | "ruling" | "announcement" | "correction" | "status_change";
	sources: Source[];
	createdAt: string;
	updatedAt: string;
};
```

### 6.4 Post (게시글)

```typescript
type Post = {
	id: string;
	authorId: string;
	authorNickname: string;
	authorImage?: string;
	title: string; // 최대 100자
	content: string; // 마크다운
	tags: Tag[]; // 최대 3개
	isAnonymous: boolean;
	likeCount: number;
	dislikeCount: number;
	commentCount: number;
	createdAt: string;
	updatedAt: string;
	isAuthor?: boolean; // 작성자인지 여부 (조회 시)
	userLiked?: "like" | "dislike" | null; // 사용자의 추천 상태 (조회 시)
};
```

### 6.5 Comment (댓글)

```typescript
type Comment = {
	id: string;
	postId: string;
	parentId: string | null; // 대댓글인 경우 부모 ID
	authorId: string;
	authorNickname: string;
	content: string;
	likeCount: number;
	createdAt: string;
	updatedAt: string;
	replies?: Comment[]; // 대댓글 목록 (선택적)
	isAuthor?: boolean; // 작성자인지 여부 (조회 시)
	userLiked?: boolean; // 사용자가 좋아요했는지 (조회 시)
};
```

### 6.6 User (사용자)

```typescript
type User = {
	id: string;
	nickname: string; // 2~20자, 유일
	email: string; // 유일
	profileImage: string | null;
	role: "guest" | "member" | "admin";
	socialProviders: ("kakao" | "naver" | "google")[];
	trackedIssueIds: string[];
	savedEventIds: string[];
	createdAt: string;
	updatedAt: string;
};
```

### 6.7 Tag (태그)

```typescript
type Tag = {
	id: string;
	name: string; // 예: "정치", "서울"
	type: "category" | "region"; // 분야 또는 지역
	slug: string; // URL 친화적 표현
};
```

### 6.8 Source (출처)

```typescript
type Source = {
	url: string;
	title: string;
	publisher: string;
	publishedAt: string; // ISO 8601 UTC
};
```

---

## 7. 부록

### 7.1 HTTP 상태 코드

| 코드                      | 설명             | 활용                     |
| ------------------------- | ---------------- | ------------------------ |
| 200 OK                    | 요청 성공        | 조회, 수정, 추천 등      |
| 201 Created               | 리소스 생성 성공 | 회원가입, 게시글 작성 등 |
| 204 No Content            | 삭제 성공        | 게시글/댓글 삭제         |
| 400 Bad Request           | 유효성 검증 실패 | E*VALID*\*               |
| 401 Unauthorized          | 인증 실패        | E*AUTH*\*                |
| 403 Forbidden             | 권한 부족        | E*PERM*\*                |
| 404 Not Found             | 리소스 없음      | E*RESOURCE*\*            |
| 409 Conflict              | 중복/충돌        | E*CONFLICT*\*            |
| 429 Too Many Requests     | Rate Limit 초과  | E*RATE*\*                |
| 500 Internal Server Error | 서버 오류        | E*SERVER*\*              |

### 7.2 Rate Limiting 정책

| 엔드포인트                   | 제한   | 윈도우 |
| ---------------------------- | ------ | ------ |
| POST /auth/register          | 5회    | 1시간  |
| POST /auth/login             | 10회   | 15분   |
| POST /posts                  | 20회   | 1시간  |
| POST /posts/:postId/comments | 50회   | 1시간  |
| GET /search                  | 100회  | 1분    |
| 기타 조회 API                | 1000회 | 1분    |

### 7.3 캐싱 전략

| 엔드포인트      | Cache-Control          | 이유               |
| --------------- | ---------------------- | ------------------ |
| GET /tags       | `public, max-age=3600` | 자주 변경되지 않음 |
| GET /events/:id | `private, max-age=300` | 5분 유효           |
| GET /issues/:id | `private, max-age=60`  | 자주 업데이트됨    |
| GET /search     | `no-cache`             | 실시간 반영 필요   |

### 7.4 예시 시나리오

**시나리오 1: 회원가입 및 로그인**

```
1. POST /auth/register
   - 이메일, 비밀번호, 닉네임 전송
   - 201 Created + accessToken, refreshToken 수신

2. POST /auth/login (토큰 만료 시 재로그인)
   - 이메일, 비밀번호 전송
   - 200 OK + tokens 수신

3. POST /auth/refresh (accessToken 만료 시)
   - refreshToken 전송
   - 200 OK + 새 accessToken 수신
```

**시나리오 2: 게시글 작성 및 댓글**

```
1. POST /posts (로그인 필수)
   - Authorization 헤더에 accessToken 포함
   - 제목, 본문, 태그 전송
   - 201 Created + postId 수신

2. POST /posts/:postId/comments
   - 댓글 내용 전송
   - 201 Created + commentId 수신

3. POST /posts/:postId/like
   - 추천 종류(like/dislike) 전송
   - 200 OK + 업데이트된 count 수신
```

**시나리오 3: 사건 조회 및 저장**

```
1. GET /events (무한 스크롤)
   - cursor, limit, 필터 파라미터 전송
   - 200 OK + items, 다음 cursor 수신
   - 페이지 끝에서 다음 커서로 재요청

2. POST /events/:eventId/save (로그인 필수)
   - 200 OK + isSaved: true 수신
   - GET /users/me/saved-events로 저장 목록 조회
```

**시나리오 4: 이슈 추적**

```
1. GET /issues (페이지네이션)
   - page, limit, 필터 파라미터 전송
   - 200 OK + items, pagination 수신

2. GET /issues/:issueId (상세 조회)
   - 200 OK + triggers, relatedEvents 포함

3. POST /issues/:issueId/track (로그인 필수)
   - 200 OK + trackerCount 업데이트
   - GET /users/me/tracked-issues로 추적 목록 조회
```

### 7.5 전체 에러 코드

**인증 (E_AUTH_001~099)**

| 코드       | HTTP | 메시지                                   |
| ---------- | ---- | ---------------------------------------- |
| E_AUTH_001 | 401  | 인증 토큰이 없습니다                     |
| E_AUTH_002 | 401  | 인증 토큰이 만료되었습니다               |
| E_AUTH_003 | 401  | 유효하지 않은 토큰입니다                 |
| E_AUTH_004 | 401  | 이메일 또는 비밀번호가 일치하지 않습니다 |
| E_AUTH_005 | 401  | SNS 인증 실패입니다                      |
| E_AUTH_006 | 401  | 이미 탈퇴한 계정입니다                   |

**권한 (E_PERM_001~099)**

| 코드       | HTTP | 메시지                           |
| ---------- | ---- | -------------------------------- |
| E_PERM_001 | 403  | 해당 기능에 대한 권한이 없습니다 |
| E_PERM_002 | 403  | 관리자 권한이 필요합니다         |
| E_PERM_003 | 403  | 작성자만 수정/삭제할 수 있습니다 |

**유효성 검증 (E_VALID_001~099)**

| 코드        | HTTP | 메시지                        |
| ----------- | ---- | ----------------------------- |
| E_VALID_001 | 400  | 필수 필드가 누락되었습니다    |
| E_VALID_002 | 400  | 필드 형식이 유효하지 않습니다 |
| E_VALID_003 | 400  | 비밀번호 복잡도가 부족합니다  |
| E_VALID_004 | 400  | 최대 길이를 초과했습니다      |
| E_VALID_005 | 400  | 최소 길이 미만입니다          |

**리소스 (E_RESOURCE_001~099)**

| 코드           | HTTP | 메시지                    |
| -------------- | ---- | ------------------------- |
| E_RESOURCE_001 | 404  | 사건을 찾을 수 없습니다   |
| E_RESOURCE_002 | 404  | 이슈를 찾을 수 없습니다   |
| E_RESOURCE_003 | 404  | 게시글을 찾을 수 없습니다 |
| E_RESOURCE_004 | 404  | 댓글을 찾을 수 없습니다   |
| E_RESOURCE_005 | 404  | 사용자를 찾을 수 없습니다 |
| E_RESOURCE_006 | 404  | 태그를 찾을 수 없습니다   |
| E_RESOURCE_007 | 404  | 출처를 찾을 수 없습니다   |

**충돌 (E_CONFLICT_001~099)**

| 코드           | HTTP | 메시지                    |
| -------------- | ---- | ------------------------- |
| E_CONFLICT_001 | 409  | 이미 가입된 이메일입니다  |
| E_CONFLICT_002 | 409  | 이미 추적 중인 이슈입니다 |
| E_CONFLICT_003 | 409  | 이미 저장된 사건입니다    |
| E_CONFLICT_004 | 409  | 이미 좋아요한 항목입니다  |
| E_CONFLICT_005 | 409  | 이미 연동된 계정입니다    |

**Rate Limiting (E_RATE_001~099)**

| 코드       | HTTP | 메시지                   |
| ---------- | ---- | ------------------------ |
| E_RATE_001 | 429  | 요청 제한을 초과했습니다 |

**서버 (E_SERVER_001~099)**

| 코드         | HTTP | 메시지                        |
| ------------ | ---- | ----------------------------- |
| E_SERVER_001 | 500  | 서버 내부 오류가 발생했습니다 |
| E_SERVER_002 | 500  | 데이터베이스 연결 오류입니다  |
| E_SERVER_003 | 500  | 외부 서비스 연동 오류입니다   |

---

## 변경 이력

| 버전 | 날짜       | 변경 사항                        |
| ---- | ---------- | -------------------------------- |
| 1.0  | 2026-02-15 | 초기 작성 (64개 엔드포인트 정의) |

---

## 문의

API 규격 관련 문의: `api-spec@trend-korea.com`
