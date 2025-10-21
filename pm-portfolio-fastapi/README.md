# PM Portfolio - FastAPI

FastAPI를 사용한 신입 PM 포트폴리오 웹사이트

## 프로젝트 구조

```
pm-portfolio-fastapi/
├── main.py                 # FastAPI 메인 애플리케이션
├── requirements.txt        # Python 의존성
├── README.md              # 프로젝트 설명서
├── static/                # 정적 파일
│   ├── css/
│   │   └── style.css      # 스타일시트
│   ├── js/
│   │   └── main.js        # JavaScript
│   └── images/            # 이미지 파일
└── templates/             # Jinja2 템플릿
    └── index.html         # 메인 페이지
```

## 설치 및 실행

### 1. 의존성 설치

```bash
cd pm-portfolio-fastapi
pip install -r requirements.txt
```

### 2. 로컬 실행

```bash
python main.py
```

또는

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

브라우저에서 `http://localhost:8000` 접속

### 3. ngrok으로 배포

#### ngrok 설치 (처음 사용하는 경우)

**macOS (Homebrew):**
```bash
brew install ngrok/ngrok/ngrok
```

**다운로드:**
https://ngrok.com/download 에서 다운로드 후 설치

#### ngrok 인증 (처음 한 번만)

1. https://dashboard.ngrok.com/signup 에서 계정 생성
2. 대시보드에서 Auth Token 복사
3. 터미널에서 인증:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

#### FastAPI 서버 실행

터미널 1:
```bash
cd pm-portfolio-fastapi
python main.py
```

#### ngrok 터널 생성

터미널 2:
```bash
ngrok http 8000
```

ngrok이 제공하는 URL (예: `https://xxxx-xxx-xxx-xxx.ngrok-free.app`)로 접속하면 외부에서도 접근 가능합니다!

**터미널 출력 예시:**
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        Asia Pacific (ap)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xxx-xxx-xxx.ngrok-free.app -> http://localhost:8000
```

## 주요 기능

### 프론트엔드
- ✅ 반응형 디자인 (모바일/태블릿/데스크탑)
- ✅ Butter Yellow 디자인 시스템
- ✅ 스크롤 애니메이션
- ✅ 햄버거 메뉴
- ✅ 부드러운 스크롤
- ✅ 프로젝트 상세 정보 표시

### 백엔드 (FastAPI)
- ✅ RESTful API 엔드포인트
- ✅ Jinja2 템플릿 렌더링
- ✅ 정적 파일 서빙
- ✅ CORS 지원 (필요시 활성화)
- ✅ Pydantic 데이터 검증

## API 엔드포인트

### 웹 페이지
- `GET /` - 메인 페이지

### API
- `GET /api/projects` - 모든 프로젝트 조회
- `GET /api/projects/{project_id}` - 특정 프로젝트 조회
- `GET /api/skills` - 스킬 목록 조회
- `POST /api/contact` - 연락 폼 제출

## 커스터마이징

### 프로젝트 데이터 수정
`main.py` 파일의 `projects_data` 리스트를 수정하세요.

### 스킬 데이터 수정
`main.py` 파일의 `skills_data` 딕셔너리를 수정하세요.

### 디자인 변경
- `static/css/style.css` - CSS 변수 `:root` 섹션에서 색상 변경
- `templates/index.html` - HTML 구조 변경
- `static/js/main.js` - JavaScript 동작 변경

## 배포 옵션

### 1. ngrok (개발/테스트용)
- 빠른 배포
- 무료 티어 제공
- URL이 매번 변경됨 (유료시 고정 가능)

### 2. Railway / Render (프로덕션용)
```bash
# Railway
railway login
railway init
railway up

# Render
# GitHub 연동 후 자동 배포
```

### 3. AWS / GCP / Azure
- Docker 컨테이너로 배포 권장

## 개발 팁

### 핫 리로드 활성화
```bash
uvicorn main:app --reload
```

### ngrok Web Interface
ngrok 실행 중 `http://localhost:4040`에서 요청/응답 모니터링 가능

### 디버깅
FastAPI는 자동으로 `/docs` (Swagger UI)와 `/redoc` 문서 제공

## 문제 해결

### 포트 이미 사용 중
```bash
# macOS/Linux
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### ngrok 연결 오류
- Auth Token 재확인
- 인터넷 연결 확인
- 방화벽 설정 확인

## 라이선스

MIT License

## 문의

pm.portfolio@email.com
