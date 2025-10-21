// 햄버거 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 스크롤 시 헤더 배경 변경
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// fade-in-up 클래스를 가진 모든 요소에 애니메이션 적용
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// CTA 버튼 클릭 이벤트
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const projectsSection = document.querySelector('#projects');
        const headerOffset = 80;
        const elementPosition = projectsSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
}

// 폼 제출 처리 (FastAPI 백엔드로 전송)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.querySelector('input[name="name"]').value,
            email: e.target.querySelector('input[name="email"]').value,
            message: e.target.querySelector('textarea[name="message"]').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                formMessage.textContent = data.message;
                formMessage.className = 'form-message success';
                contactForm.reset();

                // 3초 후 메시지 숨기기
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 3000);
            } else {
                formMessage.textContent = '메시지 전송에 실패했습니다. 다시 시도해주세요.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
            formMessage.className = 'form-message error';
        }
    });
}

// 프로젝트 카드 클릭 시 상세 정보 표시 (콘솔)
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', async function() {
        const projectId = this.dataset.projectId;

        try {
            const response = await fetch(`/api/projects/${projectId}`);
            const project = await response.json();

            console.log('프로젝트 상세:', project);
            // 여기에 모달이나 다른 UI 로직을 추가할 수 있습니다
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    });
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// 스크롤 진행률 표시 (선택적)
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // 프로그레스 바가 있다면 업데이트
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

console.log('PM Portfolio FastAPI - Ready! 🚀');
