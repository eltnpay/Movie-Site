document.addEventListener('DOMContentLoaded', function() {
    initFormAnimations();
    initPasswordToggle();
    initPasswordValidation();
    initFormSubmission();
    initInputEffects();
});

// Плавные анимации формы
function initFormAnimations() {
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        setTimeout(() => {
            authCard.style.opacity = '0';
            authCard.style.transform = 'translateY(20px)';
            authCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            requestAnimationFrame(() => {
                authCard.style.opacity = '1';
                authCard.style.transform = 'translateY(0)';
            });
        }, 100);
    }
    
    // Анимация появления полей ввода
    const inputs = document.querySelectorAll('.input-wrapper');
    inputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateX(-20px)';
        input.style.transitionDelay = `${index * 100}ms`;
        
        setTimeout(() => {
            input.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            input.style.opacity = '1';
            input.style.transform = 'translateX(0)';
        }, 300 + index * 100);
    });
}

// Показать/скрыть пароль
function initPasswordToggle() {
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('id_password1');
    
    if (!toggleBtn || !passwordInput) return;
    
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        this.classList.toggle('active');
        
        // Анимация иконки
        this.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    });
}

// Валидация пароля с плавными анимациями
function initPasswordValidation() {
    const passwordInput = document.getElementById('id_password1');
    const confirmInput = document.getElementById('id_password2');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    const passwordGroup = document.querySelector('.form-group:nth-child(3)');
    
    if (!passwordInput) return;
    
    // Проверка сложности пароля
    function checkPasswordStrength(password) {
        let strength = 0;
        const requirements = [
            password.length >= 8,
            /[A-Z]/.test(password),
            /[0-9]/.test(password),
            /[^A-Za-z0-9]/.test(password)
        ];
        
        requirements.forEach(req => {
            if (req) strength += 25;
        });
        
        return strength;
    }
    
    // Обновление индикатора силы
    function updateStrengthIndicator(strength) {
        if (!strengthFill || !strengthText) return;
        
        const prevWidth = strengthFill.style.width || '0%';
        strengthFill.style.width = `${strength}%`;
        
        // Анимация изменения ширины
        strengthFill.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Обновление текста и цвета
        let strengthLevel = 'Слабый';
        let color = '#ef4444';
        
        if (strength >= 75) {
            strengthLevel = 'Надёжный';
            color = '#10b981';
            passwordGroup.classList.add('password-strong');
            passwordGroup.classList.remove('password-medium', 'password-weak');
        } else if (strength >= 50) {
            strengthLevel = 'Средний';
            color = '#f59e0b';
            passwordGroup.classList.add('password-medium');
            passwordGroup.classList.remove('password-strong', 'password-weak');
        } else {
            passwordGroup.classList.add('password-weak');
            passwordGroup.classList.remove('password-strong', 'password-medium');
        }
        
        strengthFill.style.background = color;
        strengthText.textContent = strengthLevel;
        strengthText.style.color = color;
        
        // Анимация текста
        strengthText.style.transform = 'scale(1.1)';
        setTimeout(() => {
            strengthText.style.transition = 'transform 0.2s ease';
            strengthText.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Проверка совпадения паролей
    function checkPasswordMatch() {
        if (!confirmInput || !confirmInput.value) return;
        
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        const confirmGroup = confirmInput.closest('.form-group');
        
        if (password && confirm) {
            if (password === confirm) {
                confirmGroup.classList.add('password-match');
                
                // Анимация успеха
                const inputBorder = confirmGroup.querySelector('.input-border');
                if (inputBorder) {
                    inputBorder.style.background = '#10b981';
                    inputBorder.style.transition = 'background 0.5s ease';
                }
            } else {
                confirmGroup.classList.remove('password-match');
                const inputBorder = confirmGroup.querySelector('.input-border');
                if (inputBorder) {
                    inputBorder.style.background = '';
                }
            }
        }
    }
    
    // Обработчики событий
    passwordInput.addEventListener('input', function(e) {
        const strength = checkPasswordStrength(e.target.value);
        updateStrengthIndicator(strength);
        checkPasswordMatch();
        
        // Анимация при вводе
        if (e.target.value) {
            this.style.letterSpacing = '0.5px';
        } else {
            this.style.letterSpacing = 'normal';
        }
    });
    
    if (confirmInput) {
        confirmInput.addEventListener('input', checkPasswordMatch);
    }
    
    // Валидация при уходе с поля
    passwordInput.addEventListener('blur', function() {
        if (this.value) {
            const strength = checkPasswordStrength(this.value);
            if (strength < 50) {
                this.style.borderColor = '#ef4444';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 1000);
            }
        }
    });
}

// Обработка отправки формы
function initFormSubmission() {
    const form = document.querySelector('.auth-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Плавная анимация загрузки
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Анимация кнопки
        submitBtn.style.transform = 'scale(0.98)';
        submitBtn.style.transition = 'transform 0.2s ease';
        
        // Имитация загрузки (в реальном проекте удалить этот таймаут)
        setTimeout(() => {
            // Сброс состояния кнопки
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.style.transform = '';
            
            // Здесь будет реальная отправка формы
            // Для демонстрации просто отправляем форму
            this.submit();
        }, 1500);
    });
}

// Эффекты для полей ввода
function initInputEffects() {
    const inputs = document.querySelectorAll('.auth-form input');
    
    inputs.forEach(input => {
        // Эффект при фокусе
        input.addEventListener('focus', function() {
            const wrapper = this.closest('.input-wrapper');
            if (wrapper) {
                wrapper.style.transform = 'translateY(-2px)';
                wrapper.style.boxShadow = '0 4px 20px rgba(220, 38, 38, 0.15)';
            }
            
            // Анимация иконки
            const labelIcon = this.parentElement.querySelector('.label-icon');
            if (labelIcon) {
                labelIcon.style.transform = 'scale(1.2) rotate(5deg)';
                labelIcon.style.transition = 'transform 0.3s ease';
            }
        });
        
        input.addEventListener('blur', function() {
            const wrapper = this.closest('.input-wrapper');
            if (wrapper) {
                wrapper.style.transform = '';
                wrapper.style.boxShadow = '';
            }
            
            // Возврат иконки
            const labelIcon = this.parentElement.querySelector('.label-icon');
            if (labelIcon) {
                labelIcon.style.transform = '';
            }
        });
        
        // Валидация в реальном времени
        input.addEventListener('input', function() {
            const wrapper = this.closest('.input-wrapper');
            if (this.value) {
                wrapper.style.borderColor = 'rgba(220, 38, 38, 0.5)';
            } else {
                wrapper.style.borderColor = '';
            }
        });
    });
    
    // Эффект при наведении на кнопку "Войти"
    const loginLink = document.querySelector('.login-link');
    if (loginLink) {
        loginLink.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        loginLink.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
}

// Плавный скролл к ошибкам
function scrollToError() {
    const firstError = document.querySelector('.error-container');
    if (firstError) {
        firstError.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Анимация ошибки
        firstError.style.animation = 'none';
        requestAnimationFrame(() => {
            firstError.style.animation = 'slideIn 0.3s ease';
        });
    }
}

// Инициализация при наличии ошибок
setTimeout(scrollToError, 500);

// Добавление поддержки клавиатуры
document.addEventListener('keydown', function(e) {
    // Enter для отправки формы
    if (e.key === 'Enter' && !e.target.matches('input')) {
        const submitBtn = document.querySelector('.submit-btn:not([disabled])');
        if (submitBtn) {
            submitBtn.click();
        }
    }
    
    // Escape для сброса фокуса
    if (e.key === 'Escape') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.matches('input')) {
            activeElement.blur();
        }
    }
});

// Адаптация под системную тему
function updateTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = document.documentElement;
    
    if (!isDark) {
        root.style.setProperty('--dark-bg', '#f5f5f5');
        root.style.setProperty('--light-bg', '#ffffff');
        root.style.setProperty('--border-color', '#e5e5e5');
        root.style.setProperty('--text-primary', '#171717');
        root.style.setProperty('--text-secondary', #525252');
    }
}

// Слушатель изменения темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);

// Инициализация темы
updateTheme();