import { AuthManager } from '../auth/auth-manager.js'

const SELECTORS = {
    AUTH_INFO: '#auth-info',
    USER_EMAIL: '#user-email', 
    LOGOUT_BTN: '#logoutBtn'
}

export const LayoutViewController = {
    /**
     * Обновляет header в зависимости от авторизации
     * @param {Function} onLogout - колбэк при нажатии на выход
     */
    updateAuthHeader(onLogout) {
        const authInfo = document.querySelector(SELECTORS.AUTH_INFO)
        const userEmail = document.querySelector(SELECTORS.USER_EMAIL)
        const logoutBtn = document.querySelector(SELECTORS.LOGOUT_BTN)

        if (!authInfo || !userEmail || !logoutBtn) {
            console.warn('📛 Auth elements not found')
            return
        }

        if (AuthManager.isLoggedIn()) {
            // Показываем информацию о пользователе
            authInfo.style.display = 'flex'
            const currentUser = AuthManager.getCurrentUser()
            userEmail.textContent = currentUser.email

            // Настраиваем кнопку выхода
            logoutBtn.onclick = onLogout
        } else {
            // Скрываем информацию о пользователе
            authInfo.style.display = 'none'
        }
    }
}