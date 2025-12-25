// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация всех функций
    initLazyLoading();
    initScrollToTop();
    initMovieCardAnimations();
    initPrefetch();
    
    // Lazy loading для изображений
    function initLazyLoading() {
        const images = document.querySelectorAll('.movie-poster[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            // Плавное появление изображения
                            img.style.opacity = '0';
                            img.style.transition = 'opacity 0.5s ease';
                            
                            img.onload = function() {
                                img.style.opacity = '1';
                            };
                            
                            img.src = src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.01
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback для старых браузеров
            images.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        }
    }
    
    // Кнопка "Наверх"
    function initScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (!scrollToTopBtn) return;
        
        // Показываем/скрываем кнопку при скролле
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Плавный скролл наверх
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Анимация карточек фильмов
    function initMovieCardAnimations() {
        const movieCards = document.querySelectorAll('.movie-card');
        
        // Добавляем ripple эффект при клике
        movieCards.forEach(card => {
            card.addEventListener('click', function(e) {
                createRipple(e, card);
            });
            
            // Эффект параллакса при движении мыши
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                const poster = card.querySelector('.movie-poster');
                if (poster) {
                    poster.style.transform = `scale(1.1) translate(${deltaX * 5}px, ${deltaY * 5}px)`;
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const poster = card.querySelector('.movie-poster');
                if (poster) {
                    poster.style.transform = 'scale(1.1)';
                }
            });
        });
    }
    
    // Создание ripple эффекта
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Добавляем CSS для ripple эффекта
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .movie-card {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Предзагрузка страниц при наведении
    function initPrefetch() {
        const movieLinks = document.querySelectorAll('.movie-card');
        const prefetchedLinks = new Set();
        
        movieLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const href = this.getAttribute('href');
                
                if (href && !prefetchedLinks.has(href)) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                    
                    prefetchedLinks.add(href);
                }
            });
        });
    }
    
    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up');
        
        if ('IntersectionObserver' in window) {
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.forEach(el => {
                scrollObserver.observe(el);
            });
        }
    }
    
    animateOnScroll();
    
    // Обработка ошибок загрузки изображений
    const allImages = document.querySelectorAll('.movie-poster');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23ddd" width="200" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EНет изображения%3C/text%3E%3C/svg%3E';
        });
    });
    
    // Сохранение позиции скролла при возврате
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos));
        sessionStorage.removeItem('scrollPos');
    }
    
    // Сохраняем позицию при уходе со страницы
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPos', window.pageYOffset);
    });
    
    // Клавиатурная навигация
    document.addEventListener('keydown', function(e) {
        // ESC - прокрутка наверх
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Анимация счетчика фильмов
    const moviesCount = document.getElementById('moviesCount');
    if (moviesCount) {
        const targetCount = parseInt(moviesCount.textContent);
        let currentCount = 0;
        const duration = 1000;
        const increment = targetCount / (duration / 16);
        
        const counter = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(counter);
            }
            moviesCount.textContent = Math.floor(currentCount);
        }, 16);
    }
    
    // Добавляем индикатор загрузки для карточек
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
    
    console.log('Genre movies page initialized successfully');
});