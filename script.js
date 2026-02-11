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
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
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
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
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

// Observe partner sections
document.querySelectorAll('.partner-info-card, .current-partners').forEach(element => {
    fadeInObserver.observe(element);
});

// ========================================
// Counter Animation for Numbers (if needed in future)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
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
// Add hover effect to partner placeholders
// ========================================
const partnerPlaceholders = document.querySelectorAll('.partner-placeholder');

partnerPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });

    placeholder.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
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
// Image Slider for About Section
// ========================================
let currentSlideIndex = 0;
const sliderImages = document.querySelectorAll('.slider-image');
const sliderDots = document.querySelectorAll('.slider-dot');
const totalSlides = sliderImages.length;

function showSlide(index) {
    // Ukryj wszystkie zdjęcia
    sliderImages.forEach(img => img.classList.remove('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));

    // Pokaż wybrane zdjęcie
    if (sliderImages[index]) {
        sliderImages[index].classList.add('active');
        sliderDots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

// Event listeners dla przycisków
const btnPrev = document.getElementById('sliderPrev');
const btnNext = document.getElementById('sliderNext');

if (btnPrev) btnPrev.addEventListener('click', prevSlide);
if (btnNext) btnNext.addEventListener('click', nextSlide);

// Event listeners dla dots
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    });
});

// Auto-play (zmiana co 5 sekund)
setInterval(nextSlide, 5000);

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
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
