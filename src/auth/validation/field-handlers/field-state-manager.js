import { updateFormValidity } from "../form-validity"

// Основная функция валидации поля - orchestrator всего процесса
export const validateField = (value, validator, input, errorElement, messages) => {
    // Если поле пустое - очищаем ошибки (не валидируем пустые поля)
    if (value === '') {
        clearFieldError(input, errorElement)
        return  // выходим раньше - пустое поле не требует сложной логики
    }

    // Вызываем переданный валидатор (email, password и т.д.)
    const isValid = validator(value)
    // Обновляем визуальное состояние на основе результата валидации
    updateFieldValidation(input, errorElement, isValid, messages)
}

// Решает какое состояние показать - успех или ошибку
export const updateFieldValidation = (input, errorElement, isValid, messages) => {
    if (isValid) {
        // Поле прошло валидацию - показываем "успех"
        showFieldSuccess(input, errorElement, messages.success)
    } else {
        // Валидация не пройдена - показываем ошибку
        showFieldError(input, errorElement, messages.error)
    }
    // Важно: обновляем общее состояние формы после каждого изменения поля
    updateFormValidity()
}

// Визуальное представление состояния "ошибка"
export const showFieldError = (input, errorElement, message) => {
    errorElement.textContent = message    // устанавливаем текст ошибки
    errorElement.style.color = 'red'      // красный цвет для ошибки
    input.style.borderColor = 'red'       // красная рамка у инпута
}

// Визуальное представление состояния "успех"  
export const showFieldSuccess = (input, errorElement, message) => {
    errorElement.textContent = message    // устанавливаем текст подтверждения
    errorElement.style.color = 'green'    // зеленый цвет для успеха
    input.style.borderColor = 'green'     // зеленая рамка у инпута
}

// Сброс визуального состояния поля (когда пустое или при очистке)
export const clearFieldError = (input, errorElement) => {
    errorElement.textContent = ''         // убираем любой текст
    input.style.borderColor = ''          // сбрасываем цвет рамки к дефолтному
}