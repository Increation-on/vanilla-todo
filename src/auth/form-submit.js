// 🎯 НАСТРОЙКА ОБРАБОТКИ ОТПРАВКИ ФОРМЫ
export const setupFormSubmit = (onSubmit) => {
    const form = document.getElementById('authForm')

    // ⚡ Вешаем обработчик на событие submit формы
    form.addEventListener('submit', (e) => {
        e.preventDefault()  // 🚫 предотвращаем стандартную отправку формы
        
        // 📦 Собираем данные формы в структурированный объект
        const formData = getFormData()
        
        // 🕵️ Определяем текущий режим работы формы
       const isLoginMode = document.querySelector('.auth-form').classList.contains('login-mode')
        
        // 🎪 Вызываем переданный колбэк с данными и режимом
        onSubmit(formData, isLoginMode)
    })
}

// 📦 ФУНКЦИЯ СБОРКИ ДАННЫХ ФОРМЫ
const getFormData = () => ({
    email: document.getElementById('authEmail').value,           // 📧 email пользователя
    password: document.getElementById('authPassword').value,     // 🔑 основной пароль
    confirmPassword: document.getElementById('authConfirmPassword').value  // ✅ подтверждение пароля
})