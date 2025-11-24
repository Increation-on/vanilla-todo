import { validateField } from "./field-state-manager"
import { validatePassword } from "../field-validators"

export const setupPasswordHandler = () => {
    // Получаем ссылки на DOM-элементы для поля пароля
    const input = document.getElementById('authPassword')        // основное поле ввода пароля
    const errorElement = document.getElementById('passwordError') // контейнер для сообщений валидации

    // Навешиваем обработчик на каждое изменение в поле пароля
    input.addEventListener('input', (e) => {
        // Берем значение как есть - для пароля пробелы могут быть значимы
        const password = e.target.value
        
        // Используем общую систему валидации с конкретными параметрами для пароля
        validateField(password, validatePassword, input, errorElement, {
            error: 'Пароль должен содержать минимум 6 символов, буквы и цифры',  // детальное сообщение о требованиях
            success: '✓ Пароль корректный'  // лаконичное подтверждение
        })
    })
}