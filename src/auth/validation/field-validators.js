// Валидатор email - проверяет соответствие стандартному формату email
export const validateEmail = (email) => {
    // Регулярка для стандартной проверки email: local-part@domain.tld
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // test() возвращает true/false - идеально для валидации
    return emailPattern.test(email)
}

// Валидатор пароля - проверяет сложность пароля
export const validatePassword = (password) => {
    // Сложная регулярка проверяет 3 условия одновременно:
    // (?=.*[a-zA-Z]) - хотя бы одна буква (латиница)
    // (?=.*\d)       - хотя бы одна цифра  
    // .{6,}          - минимум 6 символов любой длины
    const passwordRegex = /(?=.*[a-zA-Z])(?=.*\d).{6,}/
    return passwordRegex.test(password)
}

// Валидатор подтверждения пароля - проверяет идентичность паролей
export const validateConfirmPassword = (password, confirmPassword) => {
    // Простое сравнение строк - пароли должны совпадать
    // Валидатор не зависит от UI и не имеет side effects
    return password === confirmPassword
}