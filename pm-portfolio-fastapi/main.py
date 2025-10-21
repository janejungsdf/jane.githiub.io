from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="PM Portfolio")

# Static files 및 템플릿 설정
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# 데이터 모델
class Project(BaseModel):
    id: int
    title: str
    description: str
    year: str
    tags: List[str]
    metrics: List[str]
    details: List[str]

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

# 프로젝트 데이터
projects_data = [
    {
        "id": 1,
        "title": "모바일 앱 사용성 개선 프로젝트",
        "description": "사용자 이탈률 25% 감소 및 DAU 35% 증가",
        "year": "2024",
        "tags": ["UX/UI", "데이터 분석", "A/B 테스팅"],
        "metrics": ["📈 DAU +35%", "📉 이탈률 -25%"],
        "details": [
            "사용자 인터뷰 및 A/B 테스트를 통한 온보딩 프로세스 개선",
            "GA4 데이터 분석으로 핵심 이탈 지점 파악 및 개선",
            "개발팀과 협업하여 3주 내 MVP 출시"
        ]
    },
    {
        "id": 2,
        "title": "신규 기능 런칭 프로젝트",
        "description": "사용자 요구사항 기반 신규 기능 기획 및 출시",
        "year": "2024",
        "tags": ["기획", "PRD", "애자일"],
        "metrics": ["👥 참여율 +42%", "⭐ 만족도 4.5/5"],
        "details": [
            "사용자 설문 및 VOC 분석으로 Pain Point 도출",
            "PRD 작성 및 와이어프레임 제작",
            "애자일 방식으로 2개월 내 성공적 출시"
        ]
    },
    {
        "id": 3,
        "title": "데이터 대시보드 구축",
        "description": "실시간 지표 모니터링 시스템 구축",
        "year": "2023",
        "tags": ["데이터", "대시보드", "KPI"],
        "metrics": ["⚡ 의사결정 속도 +50%", "📊 실시간 모니터링"],
        "details": [
            "핵심 지표(KPI) 정의 및 대시보드 설계",
            "Tableau를 활용한 시각화 및 자동화",
            "의사결정 속도 50% 단축"
        ]
    }
]

skills_data = {
    "Product Management": [
        "PRD 작성",
        "사용자 리서치",
        "로드맵 수립",
        "A/B 테스팅",
        "애자일/스크럼"
    ],
    "Data Analysis": [
        "Google Analytics 4",
        "Mixpanel",
        "Tableau",
        "SQL",
        "Excel/Google Sheets"
    ],
    "Design & Tools": [
        "Figma",
        "Notion",
        "Jira",
        "Slack",
        "Miro"
    ],
    "Communication": [
        "이해관계자 관리",
        "프레젠테이션",
        "문서화",
        "팀 협업",
        "영어 커뮤니케이션"
    ]
}

# 라우트
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """메인 페이지"""
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "projects": projects_data,
            "skills": skills_data
        }
    )

@app.get("/api/projects")
async def get_projects():
    """프로젝트 목록 API"""
    return {"projects": projects_data}

@app.get("/api/projects/{project_id}")
async def get_project(project_id: int):
    """특정 프로젝트 조회 API"""
    project = next((p for p in projects_data if p["id"] == project_id), None)
    if project:
        return project
    return {"error": "Project not found"}, 404

@app.post("/api/contact")
async def submit_contact(message: ContactMessage):
    """연락 폼 제출 API"""
    # 실제로는 이메일 전송이나 DB 저장 로직이 들어갑니다
    print(f"Contact from {message.name} ({message.email}): {message.message}")
    return {
        "success": True,
        "message": f"감사합니다, {message.name}님! 메시지가 전송되었습니다."
    }

@app.get("/api/skills")
async def get_skills():
    """스킬 목록 API"""
    return {"skills": skills_data}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
