// PATHLIT — Site JavaScript
// Hamburger menu, FAQ accordion, scroll animations, parallax blobs

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile hamburger menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            if (isOpen) {
                item.classList.remove('open');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- Scroll fade-in animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
        '.benefit-card, .step-card, .testimonial-card, .stat-card, .feature-item, .trust-badge, .glass-card'
    ).forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // --- Navbar shadow on scroll ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 10
                ? '0 4px 24px rgba(0,0,0,0.06)'
                : 'none';
        }, { passive: true });
    }

    // --- Parallax gradient blobs on mouse move (desktop only) ---
    if (window.innerWidth > 768) {
        const blobs = document.querySelectorAll('.gradient-blob');
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
        }, { passive: true });

        function animateBlobs() {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            blobs.forEach((blob, i) => {
                const factor = (i % 3 + 1) * 0.4;
                blob.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
            });

            requestAnimationFrame(animateBlobs);
        }

        animateBlobs();
    }
});
