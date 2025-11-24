// 🎯 ГЛАВНАЯ ФУНКЦИЯ РЕНДЕРИНГА ФОРМЫ С ПОДДЕРЖКОЙ РЕЖИМОВ
export const renderForm = (isLogin = true) => `
<div class="auth-form ${isLogin ? 'login-mode' : 'register-mode'}">
    <h2 id="authTitle">${getTitle(isLogin)}</h2>
    <form id="authForm">
        ${renderEmailField()}
        ${renderPasswordField()}
        ${renderConfirmPasswordField(isLogin)}
        <button type="submit" id="authButton">${getButtonText(isLogin)}</button>
    </form>
    <p>${getSwitchText(isLogin)} <a href="#" id="switchMode">${getSwitchLinkText(isLogin)}</a></p>
</div>`

// 📧 РЕНДЕРИНГ ПОЛЯ EMAIL (без изменений)
const renderEmailField = () => `
<div class="form-group">
    <label>Email:</label>
    <input type="text" id="authEmail" required>
    <div class="error-message" id="emailError"></div>
</div>`

// 🔑 РЕНДЕРИНГ ПОЛЯ ПАРОЛЯ (без изменений)
const renderPasswordField = () => `
<div class="form-group">
    <label>Пароль:</label>
    <input type="password" id="authPassword" required>
    <div class="error-message" id="passwordError"></div>
</div>`

// ✅ РЕНДЕРИНГ ПОЛЯ ПОДТВЕРЖДЕНИЯ ПАРОЛЯ (с проверкой режима)
const renderConfirmPasswordField = (isLogin) => `
<div class="form-group" id="confirmPasswordGroup" style="display: ${isLogin ? 'none' : 'block'};">
    <label>Подтверждение пароля:</label>
    <input type="password" id="authConfirmPassword">
    <div class="error-message" id="confirmPasswordError"></div>
</div>`

// 🎪 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ТЕКСТОВ

// Заголовок формы
const getTitle = (isLogin) => 
    isLogin ? 'Вход в систему' : 'Регистрация'

// Текст кнопки отправки
const getButtonText = (isLogin) => 
    isLogin ? 'Войти' : 'Зарегистрироваться'

// Текст перед ссылкой переключения
const getSwitchText = (isLogin) => 
    isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'

// Текст ссылки переключения
const getSwitchLinkText = (isLogin) => 
    isLogin ? 'Зарегистрироваться' : 'Войти'