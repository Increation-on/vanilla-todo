import { setupEmailHandler } from './field-handlers/email-handler.js'
import { setupConfirmPasswordHandler } from './field-handlers/confirm-password-handler.js'
import { setupPasswordHandler } from './field-handlers/password-handler.js'
import { updateFormValidity } from './form-validity.js'

// Главный инициализатор всей системы валидации формы
export const setupValidation = () => {
    // Инициализируем обработчики для каждого поля формы
    setupEmailHandler()           // валидация email на лету
    setupPasswordHandler()        // валидация сложности пароля
    setupConfirmPasswordHandler() // валидация совпадения паролей
    
    // Выполняем первоначальную проверку состояния формы
    // Важно: устанавливает корректное начальное состояние кнопки
    updateFormValidity()
}