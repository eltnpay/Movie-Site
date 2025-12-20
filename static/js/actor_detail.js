// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Добавление эффекта параллакса при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Добавление эффекта наведения на изображение
    const imageContainer = document.querySelector('.image-container');
    const actorImage = document.querySelector('.actor-image');
    
    if (imageContainer && actorImage) {
        imageContainer.addEventListener('mouseenter', function() {
            actorImage.style.transform = 'scale(1.1)';
            actorImage.style.transition = 'transform 0.3s ease';
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            actorImage.style.transform = 'scale(1)';
        });
    }

    // Анимация появления текста биографии
    const biography = document.querySelector('.biography');
    if (biography) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });

        biography.style.opacity = '0';
        biography.style.transform = 'translateX(-20px)';
        biography.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(biography);
    }

    // Эффект печатающегося текста для имени (опционально)
    const actorName = document.querySelector('.actor-name');
    if (actorName) {
        const text = actorName.textContent;
        actorName.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                actorName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Раскомментируй следующую строку, если хочешь эффект печатания
        // typeWriter();
    }

    // Добавление эффекта частиц (опционально)
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#dc143c';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-10px';
        particle.style.opacity = '0.5';
        particle.style.transition = 'all 3s linear';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.top = window.innerHeight + 'px';
            particle.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            particle.remove();
        }, 3100);
    }

    // Раскомментируй следующий код для добавления падающих частиц
    // setInterval(createParticle, 300);

    // Кастомный курсор (опционально)
    const cursor = document.createElement('div');
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.border = '2px solid #dc143c';
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.1s ease';
    cursor.style.display = 'none'; // Скрыт по умолчанию
    
    // Раскомментируй следующие строки для активации кастомного курсора
    // document.body.appendChild(cursor);
    // document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });

    // Клик эффект
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(220, 20, 60, 0.5)';
        ripple.style.left = e.clientX - 5 + 'px';
        ripple.style.top = e.clientY - 5 + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'all 0.6s ease-out';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.left = e.clientX - 50 + 'px';
            ripple.style.top = e.clientY - 50 + 'px';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 610);
    });

});