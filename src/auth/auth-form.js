// auth-form.js
export const AuthForm = {
    // Рендер формы входа/регистрации
    render(container) {
        container.innerHTML = `
        <div class="auth-form">
            <h2 id="authTitle">Вход</h2>
            <form id="authForm">
                <!-- Email поле -->
                <div class="form-group">
                    <label>Email:</label>
                    <input type="text" id="authEmail" required>
                    <div class="error-message" id="emailError"></div>
                </div>
                
                <!-- Пароль -->
                <div class="form-group">
                    <label>Пароль:</label>
                    <input type="password" id="authPassword" required>
                    <div class="error-message" id="passwordError"></div>
                </div>
                
                <!-- Подтверждение пароля (скрыто в режиме Вход) -->
                <div class="form-group" id="confirmPasswordGroup" style="display: none;">
                    <label>Подтверждение пароля:</label>
                    <input type="password" id="authConfirmPassword" >
                    <div class="error-message" id="confirmPasswordError"></div>
                </div>
                
                <button type="submit" id="authButton">Войти</button>
            </form>
            <p>Нет аккаунта? <a href="#" id="switchMode">Зарегистрироваться</a></p>
        </div>
    `
        this.handleFormSubmit();
        this.validateEmail();
        this.validatePassword(); // ← добавляем
        this.switchMode();
        this.checkFormValidity(); // ← начальная проверка
    },

    handleFormSubmit() {
        const form = document.getElementById('authForm');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            try {
                console.log('🎯 Начало обработки формы');

                const email = document.getElementById('authEmail').value;
                const password = document.getElementById('authPassword').value;
                console.log('📧 Данные:', { email, password });

            } catch (error) {
                console.error('❌ Ошибка:', error);
            }
            return false;
        })
    },

    checkFormValidity() {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        const confirmPassword = document.getElementById('authConfirmPassword').value;
        const button = document.getElementById('authButton');
        const confirmGroup = document.getElementById('confirmPasswordGroup');

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPasswordValid = password.length >= 6;

        // Если режим регистрации - проверяем подтверждение пароля
        const isConfirmValid = confirmGroup.style.display === 'none' ||
            password === confirmPassword;

        button.disabled = !(isEmailValid && isPasswordValid && isConfirmValid);

        // Стили кнопки
        button.style.opacity = button.disabled ? '0.6' : '1';
        button.style.cursor = button.disabled ? 'not-allowed' : 'pointer';
    },

    // Живая валидация email (используем твои регулярки)
    validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = document.getElementById('authEmail');
        const errorElement = document.getElementById('emailError');

        if (!emailInput) {
            console.error('❌ Email input не найден!');
            return;
        }

        // Отключаем браузерную валидацию
        emailInput.setAttribute('novalidate', 'true');

        emailInput.addEventListener('input', (e) => {
            const email = e.target.value.trim();

            if (email === '') {
                errorElement.textContent = '';
                emailInput.style.borderColor = ''; // сбрасываем цвет
                return;
            }

            if (!emailPattern.test(email)) {
                errorElement.textContent = 'Введите корректный email';
                errorElement.style.color = 'red';
                emailInput.style.borderColor = 'red'; // подсветка поля
            } else {
                errorElement.textContent = '✓ Email корректный';
                errorElement.style.color = 'green';
                emailInput.style.borderColor = 'green';
            }
            this.checkFormValidity()
        });
    },

    // Валидация пароля
    validatePassword() {
        const passwordInput = document.getElementById('authPassword');
        const errorElement = document.getElementById('passwordError');

        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;

            if (password === '') {
                errorElement.textContent = '';
                passwordInput.style.borderColor = '';
                return;
            }

            if (password.length < 6) {
                errorElement.textContent = 'Пароль должен содержать минимум 6 символов';
                errorElement.style.color = 'red';
                passwordInput.style.borderColor = 'red';
            } else {
                errorElement.textContent = '✓ Пароль корректный';
                errorElement.style.color = 'green';
                passwordInput.style.borderColor = 'green';
            }

            this.checkFormValidity();
        });
    },

    // Переключение между "Вход" и "Регистрация"  
    switchMode() {
        const switchLink = document.getElementById('switchMode');
        const title = document.getElementById('authTitle');
        const button = document.getElementById('authButton');
        const confirmGroup = document.getElementById('confirmPasswordGroup');

        let isLoginMode = true; // начальный режим - Вход

        switchLink.addEventListener('click', (e) => {
            e.preventDefault();

            isLoginMode = !isLoginMode; // меняем режим

            if (isLoginMode) {
                // Переключаем на Вход
                title.textContent = 'Вход';
                button.textContent = 'Войти';
                switchLink.textContent = 'Зарегистрироваться';
                confirmGroup.style.display = 'none';
            } else {
                // Переключаем на Регистрацию
                title.textContent = 'Регистрация';
                button.textContent = 'Зарегистрироваться';
                switchLink.textContent = 'Войти';
                confirmGroup.style.display = 'block';
            }

            // Обновляем валидацию
            this.checkFormValidity();
        });
    }
}