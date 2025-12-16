// Detail JS - Video controls, parallax poster
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');
    const poster = document.querySelector('.detail-poster img');
    const playOverlay = document.querySelector('.play-overlay');

    if (video) {
        // Auto play muted on hover
        document.querySelector('.video-player').addEventListener('mouseenter', () => {
            video.play().catch(() => {}); // Muted by default
            video.muted = true;
        });
        document.querySelector('.video-player').addEventListener('mouseleave', () => {
            video.pause();
        });
    }

    // Parallax on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (poster) {
            poster.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Meta chips hover
    document.querySelectorAll('.meta-chip').forEach(chip => {
        chip.addEventListener('mouseenter', () => {
            gsap.to(chip, { scale: 1.05, duration: 0.3 });
        });
        chip.addEventListener('mouseleave', () => {
            gsap.to(chip, { scale: 1, duration: 0.3 });
        });
    });
});