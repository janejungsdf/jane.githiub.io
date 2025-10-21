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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 카드와 서비스 아이템에 애니메이션 적용
document.querySelectorAll('.about-card, .service-item, .portfolio-item, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CTA 버튼 클릭 이벤트
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    const headerOffset = 80;
    const elementPosition = contactSection.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

// 폼 제출 처리
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 폼 데이터 가져오기
    const formData = new FormData(contactForm);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;

    // 성공 메시지 표시
    alert(`감사합니다, ${name}님!\n메시지가 전송되었습니다.\n\n이메일: ${email}\n메시지: ${message}`);

    // 폼 초기화
    contactForm.reset();
});

// 페이지 로드 시 히어로 섹션 애니메이션
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
});

// 다크 모드 토글
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// 로컬 스토리지에서 테마 설정 불러오기
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// 스크롤 투 탑 버튼
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ 아코디언
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // 현재 아이템이 활성화되어 있는지 확인
        const isActive = item.classList.contains('active');

        // 모든 FAQ 아이템 닫기
        faqItems.forEach(faq => faq.classList.remove('active'));

        // 클릭한 아이템이 비활성화 상태였다면 활성화
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// 통계 카운터 애니메이션
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2초
    const step = target / (duration / 16); // 60fps 기준
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer로 통계 섹션이 보일 때 애니메이션 실행
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 포트폴리오 아이템 클릭 이벤트
const portfolioBtns = document.querySelectorAll('.portfolio-btn');
portfolioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const portfolioItem = btn.closest('.portfolio-item');
        const title = portfolioItem.querySelector('h3').textContent;
        alert(`${title}에 대한 상세 정보를 확인하시겠습니까?\n\n실제 프로젝트에서는 모달이나 새 페이지로 이동합니다.`);
    });
});
