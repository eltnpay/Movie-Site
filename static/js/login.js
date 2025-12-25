// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем элементы формы
    const form = document.querySelector('.auth-form');
    const submitBtn = document.querySelector('.submit-btn');
    const inputs = document.querySelectorAll('.form-group input');
    
    // Добавляем эффект фокуса на поля ввода
    inputs.forEach(input => {
        // Эффект при фокусе
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            createParticles(this);
        });
        
        // Убираем эффект при потере фокуса
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Анимация при вводе текста
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Эффект нажатия на кнопку
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            // Создаем эффект ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Валидация формы перед отправкой
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Проверяем каждое поле
            inputs.forEach(input => {
                const errorSpan = input.parentElement.querySelector('.field-error');
                
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Добавляем сообщение об ошибке если его нет
                    if (!errorSpan) {
                        const error = document.createElement('span');
                        error.classList.add('field-error');
                        error.textContent = 'Это поле обязательно для заполнения';
                        input.parentElement.appendChild(error);
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Если форма невалидна, предотвращаем отправку
            if (!isValid) {
                e.preventDefault();
                shakeForm();
            } else {
                // Показываем индикатор загрузки
                showLoading();
            }
        });
    }
    
    // Функция создания частиц при фокусе
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #ff0000;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
    
    // Функция тряски формы при ошибке
    function shakeForm() {
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.style.animation = 'none';
            setTimeout(() => {
                loginBox.style.animation = 'shake 0.5s';
            }, 10);
        }
    }
    
    // Функция показа загрузки
    function showLoading() {
        if (submitBtn) {
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            
            if (btnText && btnIcon) {
                btnText.textContent = 'Загрузка';
                btnIcon.textContent = '⏳';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.style.cursor = 'not-allowed';
            }
        }
    }
    
    // Автоматическое удаление сообщений об ошибках при исправлении
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorSpan = this.parentElement.querySelector('.field-error');
            if (errorSpan && this.value.trim() !== '') {
                errorSpan.style.animation = 'fadeOut 0.3s forwards';
                setTimeout(() => errorSpan.remove(), 300);
                this.classList.remove('error');
            }
        });
    });
    
    // Клавиатурные сокращения
    document.addEventListener('keydown', function(e) {
        // Enter для отправки формы
        if (e.key === 'Enter' && document.activeElement.tagName === 'INPUT') {
            e.preventDefault();
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape для очистки полей
        if (e.key === 'Escape') {
            inputs.forEach(input => {
                input.value = '';
                input.blur();
            });
        }
    });
    
    // Добавляем CSS анимации динамически
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            to {
                transform: translateY(-50px);
                opacity: 0;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .form-group.focused label {
            color: #ff3333;
            transform: translateX(5px);
            transition: all 0.3s ease;
        }
        
        input.error {
            border-color: #ff0000 !important;
            animation: inputShake 0.3s;
        }
        
        @keyframes inputShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Эффект печатающейся машинки для заголовка
    const title = document.querySelector('.login-header h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }
    
    console.log('🔥 Форма входа загружена успешно!');
});