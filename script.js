// ========================================
// Countdown Timer
// ========================================
function updateCountdown() {
    const eventDate = new Date('2026-10-16T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = days > 0 ? days : 0;
    if (hoursElement) hoursElement.textContent = hours > 0 ? hours : 0;
    if (minutesElement) minutesElement.textContent = minutes > 0 ? minutes : 0;
    if (secondsElement) secondsElement.textContent = seconds > 0 ? seconds : 0;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ========================================
// Mobile Navigation Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
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

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id], footer[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    const headerOffset = 120;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
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
// Navbar Shadow on Scroll
// ========================================
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
}

// ========================================
// Smooth Scroll for Anchors
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

            if (navMenu) {
                navMenu.classList.remove('active');
                if (hamburger) {
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => span.style.transform = 'none');
                    if (spans[1]) spans[1].style.opacity = '1';
                }
            }
        }
    });
});

// ========================================
// Photo Carousel Controls (Auto-Slide Movement & Manual Navigation)
// ========================================
const galleryCarousel = document.getElementById('galleryCarousel');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

if (galleryCarousel) {
    const slideStep = 340;
    let autoSlideTimer = null;

    const scrollNext = () => {
        const maxScrollLeft = galleryCarousel.scrollWidth - galleryCarousel.clientWidth;
        if (galleryCarousel.scrollLeft >= maxScrollLeft - 15) {
            galleryCarousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            galleryCarousel.scrollBy({ left: slideStep, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (galleryCarousel.scrollLeft <= 15) {
            const maxScrollLeft = galleryCarousel.scrollWidth - galleryCarousel.clientWidth;
            galleryCarousel.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
            galleryCarousel.scrollBy({ left: -slideStep, behavior: 'smooth' });
        }
    };

    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideTimer = setInterval(scrollNext, 2500);
    };

    const stopAutoSlide = () => {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    };

    if (carouselPrev && carouselNext) {
        carouselPrev.addEventListener('click', () => {
            scrollPrev();
            startAutoSlide();
        });
        carouselNext.addEventListener('click', () => {
            scrollNext();
            startAutoSlide();
        });
    }

    // Pause auto-sliding when user hovers or touches carousel
    galleryCarousel.addEventListener('mouseenter', stopAutoSlide);
    galleryCarousel.addEventListener('mouseleave', startAutoSlide);
    galleryCarousel.addEventListener('touchstart', stopAutoSlide, { passive: true });
    galleryCarousel.addEventListener('touchend', startAutoSlide, { passive: true });

    // Start auto-slide motion
    startAutoSlide();
}

// ========================================
// Lightbox Modal
// ========================================
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (lightbox && img) {
        img.src = src;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

// ========================================
// FAQ Accordion
// ========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                answer.style.opacity = '1';
            }
        });
    }
});

// ========================================
// Expandable Partner Tiles
// ========================================
const partnerExpandCards = document.querySelectorAll('.partner-expand-card');

partnerExpandCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) return;

        const isActive = card.classList.contains('active');

        partnerExpandCards.forEach(c => {
            if (c !== card) c.classList.remove('active');
        });

        card.classList.toggle('active', !isActive);
    });
});

console.log('%cWild West Integration Weekend', 'color: #2e3192; font-size: 22px; font-weight: bold;');
