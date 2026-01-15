/**
 * TSUNAGU ICT Corporate Website
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader(); // Add this
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initCompanyIllustration();
    initSmoothScroll();

    // New animations
    initHeroParticles();
    initParallax();
    initCountUp();
    initButtonRipple();
});

/**
 * Loading Screen
 */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loader-wrapper--hidden');
        }, 1000); // 最小1秒は表示させてブランドを印象付ける
    });
}

/**
 * Header scroll effect
 */
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const button = document.getElementById('backToTop');

    if (!button) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Company section isometric illustration
 */
function initCompanyIllustration() {
    const companyIllustration = document.querySelector('.company__illustration');

    if (!companyIllustration) return;

    // Create isometric city illustration SVG for company background
    companyIllustration.innerHTML = `
        <defs>
            <linearGradient id="companyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFFFFF"/>
                <stop offset="100%" style="stop-color:#FFF9F5"/>
            </linearGradient>
        </defs>

        <!-- Background -->
        <rect width="1920" height="800" fill="url(#companyGradient)"/>

        <!-- Grid pattern -->
        <g opacity="0.03" stroke="#F07F2C" stroke-width="1">
            ${generateGridPattern()}
        </g>

        <!-- Isometric buildings - Left side -->
        <g transform="translate(50, 400)">
            ${generateIsometricBuilding(0, 0, 60, 150, '#F07F2C', 0.15)}
            ${generateIsometricBuilding(80, 30, 50, 120, '#F07F2C', 0.12)}
            ${generateIsometricBuilding(150, 20, 55, 140, '#F07F2C', 0.1)}
        </g>

        <!-- Isometric buildings - Right side -->
        <g transform="translate(1500, 350)">
            ${generateIsometricBuilding(0, 0, 70, 180, '#F07F2C', 0.15)}
            ${generateIsometricBuilding(90, 40, 60, 140, '#F07F2C', 0.12)}
            ${generateIsometricBuilding(170, 25, 65, 160, '#F07F2C', 0.1)}
        </g>

        <!-- Floating devices and icons -->
        <g class="floating-elements">
            <!-- Smartphone -->
            <g transform="translate(200, 150)" opacity="0.3">
                <rect x="0" y="0" width="40" height="70" rx="5" fill="none" stroke="#F07F2C" stroke-width="2"/>
                <rect x="5" y="10" width="30" height="45" fill="none" stroke="#F07F2C" stroke-width="1"/>
                <circle cx="20" cy="62" r="3" fill="none" stroke="#F07F2C" stroke-width="1"/>
            </g>

            <!-- Tablet -->
            <g transform="translate(1650, 180)" opacity="0.25">
                <rect x="0" y="0" width="80" height="60" rx="5" fill="none" stroke="#F07F2C" stroke-width="2"/>
                <rect x="5" y="5" width="70" height="45" fill="none" stroke="#F07F2C" stroke-width="1"/>
                <circle cx="40" cy="55" r="2" fill="none" stroke="#F07F2C" stroke-width="1"/>
            </g>

            <!-- Connection lines -->
            <g stroke="#F07F2C" stroke-width="1" opacity="0.1" stroke-dasharray="5,5">
                <line x1="240" y1="200" x2="400" y2="350"/>
                <line x1="1690" y1="220" x2="1550" y2="380"/>
            </g>

            <!-- WiFi/Signal icons -->
            <g transform="translate(1750, 400)" opacity="0.15">
                <path d="M20 30 Q20 20 30 20 Q40 20 40 30" fill="none" stroke="#F07F2C" stroke-width="2"/>
                <path d="M15 25 Q15 10 30 10 Q45 10 45 25" fill="none" stroke="#F07F2C" stroke-width="2"/>
                <path d="M10 20 Q10 0 30 0 Q50 0 50 20" fill="none" stroke="#F07F2C" stroke-width="2"/>
                <circle cx="30" cy="35" r="3" fill="#F07F2C"/>
            </g>

            <!-- Lifeline icons -->
            ${generateLifelineIcons()}
        </g>

        <!-- Decorative circles -->
        <circle cx="150" cy="300" r="80" fill="none" stroke="#F07F2C" stroke-width="1" opacity="0.05"/>
        <circle cx="1800" cy="500" r="100" fill="none" stroke="#F07F2C" stroke-width="1" opacity="0.05"/>
    `;

    // Add floating animation
    addFloatingAnimation();
}

/**
 * Generate grid pattern for background
 */
function generateGridPattern() {
    let lines = '';
    for (let i = 0; i < 20; i++) {
        lines += `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="1080"/>`;
    }
    for (let i = 0; i < 12; i++) {
        lines += `<line x1="0" y1="${i * 100}" x2="1920" y2="${i * 100}"/>`;
    }
    return lines;
}

/**
 * Generate isometric building
 */
function generateIsometricBuilding(x, y, width, height, color, opacity) {
    const halfWidth = width / 2;
    return `
        <g transform="translate(${x}, ${y})" opacity="${opacity}">
            <!-- Front face -->
            <path d="M0 ${height} L${halfWidth} ${height + halfWidth/2} L${halfWidth} ${halfWidth/2} L0 0 Z"
                  fill="${color}" opacity="0.8"/>
            <!-- Right face -->
            <path d="M${halfWidth} ${height + halfWidth/2} L${width} ${height} L${width} 0 L${halfWidth} ${halfWidth/2} Z"
                  fill="${color}" opacity="0.6"/>
            <!-- Top face -->
            <path d="M0 0 L${halfWidth} ${halfWidth/2} L${width} 0 L${halfWidth} ${-halfWidth/2} Z"
                  fill="${color}" opacity="1"/>
            <!-- Windows -->
            ${generateWindows(halfWidth, height, 4)}
        </g>
    `;
}

/**
 * Generate windows for building
 */
function generateWindows(width, height, rows) {
    let windows = '';
    const windowHeight = height / (rows + 2);
    for (let i = 1; i <= rows; i++) {
        windows += `
            <rect x="${width * 0.2}" y="${i * windowHeight}"
                  width="${width * 0.3}" height="${windowHeight * 0.6}"
                  fill="white" opacity="0.5"/>
        `;
    }
    return windows;
}

/**
 * Generate person icon
 */
function generatePersonIcon(x, y) {
    return `
        <g transform="translate(${x}, ${y})">
            <circle cx="10" cy="5" r="5" fill="#F07F2C"/>
            <path d="M10 10 L10 25 M5 15 L15 15 M10 25 L5 35 M10 25 L15 35"
                  stroke="#F07F2C" stroke-width="2" fill="none"/>
        </g>
    `;
}

/**
 * Generate Lifeline icons for company section
 */
function generateLifelineIcons() {
    return `
        <!-- Electric icon -->
        <g transform="translate(100, 500)" opacity="0.2">
            <circle cx="0" cy="0" r="25" fill="none" stroke="#F07F2C" stroke-width="2"/>
            <path d="M-5 -10 L5 0 L-3 0 L5 10 L-5 0 L3 0 Z" fill="#F07F2C"/>
        </g>

        <!-- Gas icon -->
        <g transform="translate(1820, 300)" opacity="0.2">
            <circle cx="0" cy="0" r="25" fill="none" stroke="#F07F2C" stroke-width="2"/>
            <path d="M0 -12 Q-8 -5 -8 5 Q-8 12 0 12 Q8 12 8 5 Q8 -5 0 -12" fill="none" stroke="#F07F2C" stroke-width="2"/>
        </g>

        <!-- Phone icon -->
        <g transform="translate(80, 200)" opacity="0.15">
            <circle cx="0" cy="0" r="25" fill="none" stroke="#F07F2C" stroke-width="2"/>
            <rect x="-8" y="-12" width="16" height="24" rx="2" fill="none" stroke="#F07F2C" stroke-width="2"/>
            <circle cx="0" cy="8" r="2" fill="#F07F2C"/>
        </g>
    `;
}

/**
 * Add floating animation to elements
 */
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .floating-elements > g:nth-child(1) { animation: float 4s ease-in-out infinite; }
        .floating-elements > g:nth-child(2) { animation: float 5s ease-in-out infinite 0.5s; }
        .floating-elements > g:nth-child(3) { animation: float 4.5s ease-in-out infinite 1s; }
        .floating-elements > g:nth-child(4) { animation: float 5.5s ease-in-out infinite 0.3s; }
        .floating-elements > g:nth-child(5) { animation: float 4s ease-in-out infinite 0.7s; }
    `;
    document.head.appendChild(style);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Hero Particles Animation
 */
function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero__particles';
    hero.appendChild(particlesContainer);

    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        particlesContainer.appendChild(particle);
    }
}

/**
 * Parallax Effect
 */
function initParallax() {
    const heroImage = document.querySelector('.hero__image');
    const heroContent = document.querySelector('.hero__content');

    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
            // Parallax for background image
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;

            // Parallax for content (slower)
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }
    });
}

/**
 * Count Up Animation
 */
function initCountUp() {
    const countElements = document.querySelectorAll('.company__table td');

    countElements.forEach(td => {
        const text = td.textContent;
        // Match numbers like "12名", "100万円", "2025年9月24日"
        const match = text.match(/^(\d+)(.*)/);

        if (match && !text.includes('〒') && !text.includes('@')) {
            const targetNum = parseInt(match[1]);
            const suffix = match[2];

            // Store original values
            td.dataset.target = targetNum;
            td.dataset.suffix = suffix;
            td.dataset.counted = 'false';
        }
    });

    // Intersection Observer for count animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const td = entry.target;
                if (td.dataset.counted === 'false' && td.dataset.target) {
                    animateCount(td, parseInt(td.dataset.target), td.dataset.suffix);
                    td.dataset.counted = 'true';
                }
            }
        });
    }, { threshold: 0.5 });

    countElements.forEach(td => {
        if (td.dataset.target) {
            observer.observe(td);
        }
    });
}

function animateCount(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

/**
 * Button Ripple Effect
 */
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'btn__ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}
