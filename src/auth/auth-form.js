// auth-form.js
import { AuthManager } from "./auth-manager.js";
import { initApp } from "../event-handlers.js";

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
        this.validateConfirmPassword(); // ← ДОБАВЬ ЭТУ СТРОЧКУ
        this.switchMode();
        this.checkFormValidity(); // ← начальная проверка
    },

    handleFormSubmit() {
        const form = document.getElementById('authForm');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            const isLoginMode = document.getElementById('authTitle').textContent === 'Вход';

            let success = false;

            if (isLoginMode) {
                // РЕЖИМ ВХОДА
                success = AuthManager.login(email, password);
                if (success) {
                    console.log('✅ Вход выполнен!');
                    this.switchToTodoList();
                } else {
                    console.log('❌ Ошибка входа: неверный email или пароль');
                    this.showError('Неверный email или пароль');
                }
            } else {
                // РЕЖИМ РЕГИСТРАЦИИ
                success = AuthManager.register(email, password);
                if (success) {
                    console.log('✅ Регистрация успешна!');
                    this.showSuccessMessage('Регистрация успешна! Теперь войдите в аккаунт');
                    // После регистрации автоматически переключаем на форму входа
                    this.switchToLogin();
                } else {
                    console.log('❌ Ошибка регистрации: email уже занят');
                    this.showError('Email уже занят');
                }
            }
        })
    },

    checkFormValidity() {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        const confirmPassword = document.getElementById('authConfirmPassword').value;
        const button = document.getElementById('authButton');
        const confirmGroup = document.getElementById('confirmPasswordGroup');

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPasswordValid = /(?=.*[a-zA-Z])(?=.*\d).{6,}/.test(password);

        // В режиме регистрации проверяем подтверждение пароля
        const isRegistrationMode = confirmGroup.style.display === 'block';
        const isConfirmValid = !isRegistrationMode || password === confirmPassword;

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
            const passwordRegex = /(?=.*[a-zA-Z])(?=.*\d).{6,}/;
            if (!passwordRegex.test(password)) {
                errorElement.textContent = 'Пароль должен содержать минимум 6 символов, буквы и цифры';
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
        const confirmInput = document.getElementById('authConfirmPassword');

        let isLoginMode = true;

        switchLink.addEventListener('click', (e) => {
            e.preventDefault();

            isLoginMode = !isLoginMode;

            if (isLoginMode) {
                // Переключаем на Вход
                title.textContent = 'Вход';
                button.textContent = 'Войти';
                switchLink.textContent = 'Зарегистрироваться';
                confirmGroup.style.display = 'none';
                // Очищаем поле подтверждения
                confirmInput.value = '';
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
    },

    // В конец AuthForm, после switchMode
    switchToTodoList() {
    console.log('✅ Auth successful, switching to TodoApp');
    // Просто перезапускаем приложение - оно само покажет задачи
    initApp();
},

    switchToLogin() {
        // Переключаем обратно на форму входа
        document.getElementById('authTitle').textContent = 'Вход';
        document.getElementById('authButton').textContent = 'Войти';
        document.getElementById('switchMode').textContent = 'Зарегистрироваться';
        document.getElementById('confirmPasswordGroup').style.display = 'none';

        // Очищаем поля
        document.getElementById('authPassword').value = '';
        document.getElementById('authConfirmPassword').value = '';
    },

    showSuccessMessage(message) {
        // Просто покажем в консоли, потом сделаем красиво
        console.log('🎉 ' + message);
    },

    // Валидация подтверждения пароля
    validateConfirmPassword() {
        const confirmInput = document.getElementById('authConfirmPassword');
        const errorElement = document.getElementById('confirmPasswordError');
        const passwordInput = document.getElementById('authPassword');

        if (!confirmInput) return;

        confirmInput.addEventListener('input', (e) => {
            const confirmPassword = e.target.value;
            const password = passwordInput.value;

            if (confirmPassword === '') {
                errorElement.textContent = '';
                confirmInput.style.borderColor = '';
                return;
            }

            if (confirmPassword !== password) {
                errorElement.textContent = 'Пароли не совпадают';
                errorElement.style.color = 'red';
                confirmInput.style.borderColor = 'red';
            } else {
                errorElement.textContent = '✓ Пароли совпадают';
                errorElement.style.color = 'green';
                confirmInput.style.borderColor = 'green';
            }

            this.checkFormValidity();
        });
    }
}