import { updateFieldValidation } from "./field-state-manager"
import { validateConfirmPassword } from "../field-validators"

export const setupConfirmPasswordHandler = () => {
    // Получаем ссылки на DOM-элементы
    const input = document.getElementById('authConfirmPassword')        // поле подтверждения пароля
    const errorElement = document.getElementById('confirmPasswordError') // элемент для отображения ошибки
    const passwordInput = document.getElementById('authPassword')       // основное поле пароля (нужно для сравнения)

    // Навешиваем обработчик на событие ввода
    input.addEventListener('input', (e) => {
        // Получаем текущие значения полей
        const confirmPassword = e.target.value                          // что пользователь ввел в поле подтверждения
        const password = passwordInput?.value || ''                     // значение основного пароля (защита от undefined)
        
        // Проверяем совпадение паролей
        const isValid = validateConfirmPassword(password, confirmPassword) // вызываем валидатор
        
        // Обновляем визуальное состояние поля
        updateFieldValidation(input, errorElement, isValid, {
            error: 'Пароли не совпадают',    // сообщение при ошибке
            success: '✓ Пароли совпадают'    // сообщение при успехе
        })
    })
}