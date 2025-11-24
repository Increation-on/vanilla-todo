// auth/ui/mode-switcher.js
import { updateFormValidity } from "./validation/form-validity"

// 🎯 НАСТРОЙКА ПЕРЕКЛЮЧАТЕЛЯ РЕЖИМОВ ФОРМЫ
export const setupModeSwitcher = () => {
    const switchLink = document.getElementById('switchMode')
    // ⚡ Вешаем обработчик на ссылку переключения режима
    switchLink?.addEventListener('click', (e) => {
        e.preventDefault() // 🚫 предотвращаем переход по ссылке
        toggleMode()       // 🔄 переключаем режим
    })
}

// 🔄 ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ ЛОГИНА (публичный API для внешнего использования)
export const switchToLoginMode = () => {
    setMode('login')           // 🎨 устанавливаем UI в режим логина
    clearPasswordFields()      // 🧹 очищаем поля паролей (безопасность UX)
    updateFormValidity()       // ✅ обновляем состояние формы (скрылось поле)
}

// 🔀 ПЕРЕКЛЮЧЕНИЕ МЕЖДУ РЕЖИМАМИ (внутренняя логика по клику)
const toggleMode = () => {
    // 🕵️ Определяем текущий режим по заголовку формы
    const isLoginMode = document.getElementById('authTitle').textContent === 'Вход в систему'
    // 🔄 переключаем на противоположный режим
    setMode(isLoginMode ? 'register' : 'login')
    updateFormValidity() // ✅ обновляем валидацию (появилось/скрылось поле)
}

// 🎨 ОСНОВНАЯ ФУНКЦИЯ УСТАНОВКИ РЕЖИМА - обновляет весь UI
const setMode = (mode) => {
    const isLogin = mode === 'login'
    
    // 📝 ОБНОВЛЯЕМ ОСНОВНЫЕ ТЕКСТЫ ИНТЕРФЕЙСА:
    document.getElementById('authTitle').textContent = isLogin ? 'Вход в систему' : 'Регистрация'
    document.getElementById('authButton').textContent = isLogin ? 'Войти' : 'Зарегистрироваться'
    
    // 🔄 ОБНОВЛЯЕМ ТЕКСТЫ ПЕРЕКЛЮЧАТЕЛЯ (умные фразы)
    const switchText = document.querySelector('#switchMode').parentNode
    switchText.innerHTML = isLogin 
        ? 'Нет аккаунта? <a href="#" id="switchMode">Зарегистрироваться</a>'      // 👉 для режима входа
        : 'Уже есть аккаунт? <a href="#" id="switchMode">Войти</a>'               // 👈 для режима регистрации
    
    // 🎨 ОБНОВЛЯЕМ CSS-КЛАСС ФОРМЫ ДЛЯ ВИЗУАЛЬНОГО РАЗДЕЛЕНИЯ
    const authForm = document.querySelector('.auth-form')
    authForm.className = isLogin ? 'auth-form login-mode' : 'auth-form register-mode'
    
    // 👥 УПРАВЛЯЕМ ВИДИМОСТЬЮ ГРУППЫ ПОДТВЕРЖДЕНИЯ ПАРОЛЯ:
    document.getElementById('confirmPasswordGroup').style.display = isLogin ? 'none' : 'block'
    
    // 🔁 ПЕРЕНАЗНАЧАЕМ ОБРАБОТЧИК НА НОВУЮ ССЫЛКУ (после изменения HTML)
    const newSwitchLink = document.getElementById('switchMode')
    newSwitchLink.addEventListener('click', (e) => {
        e.preventDefault()
        toggleMode()
    })
}

// 🧹 ОЧИСТКА ПОЛЕЙ ПАРОЛЕЙ (при переключении на логин)
const clearPasswordFields = () => {
    document.getElementById('authPassword').value = ''
    document.getElementById('authConfirmPassword').value = ''
}