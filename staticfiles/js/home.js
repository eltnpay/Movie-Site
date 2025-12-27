// Home JS - Infinite scroll sim, card hovers
document.addEventListener('DOMContentLoaded', () => {
    // Hover on cards
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.movie-overlay'), { y: 0, duration: 0.4 });
            gsap.to(card.querySelector('.movie-poster'), { scale: 1.1, duration: 0.6 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.movie-overlay'), { y: '100%', duration: 0.4 });
            gsap.to(card.querySelector('.movie-poster'), { scale: 1, duration: 0.6 });
        });
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('skeleton');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
});