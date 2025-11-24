import { renderForm } from './form-renderer.js'
import { setupValidation } from './validation/setup-validation.js'
import { setupModeSwitcher } from './form-mode-switcher.js'
import { setupFormSubmit } from './form-submit.js'
import { handleAuthSubmit } from './auth-controller.js'
import './auth.css'

// 🎯 ГЛАВНЫЙ ИНИЦИАЛИЗАТОР ФОРМЫ АВТОРИЗАЦИИ 
// Точка входа в auth модуль - связывает все части системы
export function initAuthForm(container, onLoginSuccessCallback = () => { }) {
    // 🎨 Рендерим HTML структуру формы в переданный контейнер
    container.innerHTML = renderForm(true)

    // 🔄 Создаем адаптер между UI и бизнес-логикой
    const onLoginSuccess = () => {
        console.log('✅ Вход выполнен!')
        onLoginSuccessCallback() // 🎪 вызываем колбэк от внешнего кода
    }

    // ⚙️ Настраиваем всю логику работы формы, передавая onLoginSuccess
    setupAuthForm(onLoginSuccess)
}

// 🏗️ НАСТРОЙКА ФУНКЦИОНАЛЬНОСТИ ФОРМЫ ПОСЛЕ РЕНДЕРА
// Orchestrator - связывает все подсистемы формы
function setupAuthForm(onLoginSuccess) {
    setupValidation()          // ✅ система валидации полей
    setupModeSwitcher()        // 🔄 переключение логин/регистрация
    
    // 🎪 Настраиваем обработчик сабмита с передачей колбэка
    setupFormSubmit((formData, isLoginMode) => {
        // 📤 Передаем данные в бизнес-логику (auth-controller)
        handleAuthSubmit(formData, isLoginMode, onLoginSuccess)
    })
}