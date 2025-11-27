import { initAuthForm } from '../auth/auth-form.js'

const SELECTORS = {
    AUTH_CONTAINER: '#auth-container'
}

export const AuthViewController = {
    /**
     * Показывает форму авторизации
     */
    showAuthForm(onSuccess) {
        console.log('📝 Showing auth form')
        
        // Убираем старую форму если есть
        this.removeAuthForm()

        // Создаем контейнер для формы
        const authContainer = document.createElement('div')
        authContainer.id = SELECTORS.AUTH_CONTAINER.slice(1)
        document.body.appendChild(authContainer)

        // Рендерим форму через функцию
        initAuthForm(authContainer, onSuccess)
    },

    /**
     * Убирает форму авторизации
     */
    removeAuthForm() {
        const authContainer = document.querySelector(SELECTORS.AUTH_CONTAINER)
        if (authContainer) {
            authContainer.remove()
        }
    }
}