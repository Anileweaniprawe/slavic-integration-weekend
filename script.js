// ========================================
// Countdown Timer
// ========================================
function updateCountdown() {
    // Data wydarzenia: 13 marca 2026, 00:00:00
    const eventDate = new Date('2026-03-13T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Oblicz dni, godziny, minuty, sekundy
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Aktualizuj HTML
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
    if (secondsElement) secondsElement.textContent = seconds;

    // Jeśli countdown się skończył
    if (distance < 0) {
        if (daysElement) daysElement.textContent = '0';
        if (hoursElement) hoursElement.textContent = '0';
        if (minutesElement) minutesElement.textContent = '0';
        if (secondsElement) secondsElement.textContent = '0';
    }
}

// Uruchom countdown od razu
updateCountdown();

// Aktualizuj co sekundę
setInterval(updateCountdown, 1000);

// ========================================
// Mobile Navigation Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id], footer[id], div.split-column[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    const headerOffset = 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        // Oblicz pozycję absolutną względem dokumentu
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ========================================
// Navbar Background on Scroll
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// Smooth Scroll Polyfill for older browsers
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Zamknij menu mobilne po kliknięciu
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.style.transform = 'none');
            spans[1].style.opacity = '1';
        }
    });
});

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all detail cards
document.querySelectorAll('.detail-card').forEach(card => {
    fadeInObserver.observe(card);
});

// Observe about section
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    fadeInObserver.observe(aboutText);
}





// ========================================
// Parallax Effect for Hero Section
// ========================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});



// ========================================
// Add interactive glow effect to detail cards
// ========================================
const detailCards = document.querySelectorAll('.detail-card');

detailCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// Console Welcome Message
// ========================================
console.log('%cSlavic Integration Weekend', 'color: #2e3192; font-size: 24px; font-weight: bold;');
console.log('%cConnecting cultures, building bridges 🌍', 'color: #ec008c; font-size: 14px;');

// ========================================
// Page Load Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});



// ========================================
// Folders & Lightbox
// ========================================
function toggleFolder(folder) {
    // Zamknij inne foldery (opcjonalnie, jeśli chcemy tylko jeden otwarty)
    // const folders = document.querySelectorAll('.folder');
    // folders.forEach(f => {
    //    if (f !== folder) f.classList.remove('open');
    // });

    folder.classList.toggle('open');
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Close lightbox on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
