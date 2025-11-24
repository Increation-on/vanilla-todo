import { validateEmail } from "../field-validators"
import { validateField } from "./field-state-manager"

export const setupEmailHandler = () => {
    // Получаем ссылки на DOM-элементы для email поля
    const input = document.getElementById('authEmail')           // инпут для ввода email
    const errorElement = document.getElementById('emailError')   // контейнер для сообщений об ошибке

    // Вешаем обработчик на событие ввода (каждое изменение текста)
    input.addEventListener('input', (e) => {
        // trim() убирает пробелы в начале и конце - хорошая практика для email
        const email = e.target.value.trim()
        
        // Используем общую функцию валидации, передавая специфичные параметры для email
        validateField(email, validateEmail, input, errorElement, {
            error: 'Введите корректный email',    // сообщение при невалидном email
            success: '✓ Email корректный'         // сообщение при успешной валидации
        })
    })
}