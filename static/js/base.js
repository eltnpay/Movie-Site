// Base JS - Particles, GSAP scroll, header scroll
document.addEventListener('DOMContentLoaded', () => {
    // Particles.js для фона (кино-звёзды)
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#E50914' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 1, direction: 'none', random: true }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' } }
        }
    });

    // GSAP animations
    gsap.registerPlugin();

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = window.scrollY;
    });

    // Fade in on scroll
    gsap.utils.toArray('.fade-in-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: el,
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Search focus animation
    const searchInput = document.querySelector('.search-form input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            gsap.to(searchInput, { scale: 1.02, duration: 0.3 });
        });
        searchInput.addEventListener('blur', () => {
            gsap.to(searchInput, { scale: 1, duration: 0.3 });
        });
    }
});