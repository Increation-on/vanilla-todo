import { validateEmail, validatePassword, validateConfirmPassword } from './field-validators.js'

// Главная функция управления состоянием всей формы
export const updateFormValidity = () => {
    // Безопасно получаем значения всех полей (защита от null/undefined)
    const email = document.getElementById('authEmail')?.value || ''
    const password = document.getElementById('authPassword')?.value || ''
    const confirmPassword = document.getElementById('authConfirmPassword')?.value || ''
    
    // Получаем ссылки на UI-элементы
    const button = document.getElementById('authButton')
    const confirmGroup = document.getElementById('confirmPasswordGroup') // группа подтверждения пароля

    // Защита от случаев когда кнопки нет в DOM
    if (!button) return

    // Валидируем основные поля
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    
    // Определяем режим формы: регистрация или логин
    // Если группа подтверждения пароля видима - значит это регистрация
    const isRegistrationMode = confirmGroup?.style.display === 'block'
    
    // В режиме логина подтверждение пароля не требуется (автоматически valid)
    // В режиме регистрации проверяем совпадение паролей
    const isConfirmValid = !isRegistrationMode || validateConfirmPassword(password, confirmPassword)

    // Форма валидна только если ВСЕ условия выполнены
    const isValid = isEmailValid && isPasswordValid && isConfirmValid
    
    // Обновляем состояние кнопки отправки
    updateButtonState(button, isValid)
}

// Управление визуальным состоянием и поведением кнопки
const updateButtonState = (button, isValid) => {
    button.disabled = !isValid                    // блокировка/разблокировка кнопки
    button.style.opacity = isValid ? '1' : '0.6'  // визуальное затемнение при блокировке
    button.style.cursor = isValid ? 'pointer' : 'not-allowed'  // изменение курсора
}