// auth/auth-manager.js
export const AuthManager = {
    isAuthenticated() {
        // ВРЕМЕННАЯ ЗАГЛУШКА - всегда не авторизован
        return false;
    },
    
    init() {
        const appContainer = document.getElementById('app');
        
        if (this.isAuthenticated()) {
            // Показываем туду-лист
            initializeTasks();
            initGlobalEventHandlers();
            initRouter();
        } else {
            // Показываем форму входа
            appContainer.innerHTML = '';
            AuthForm.render(appContainer);
        }
    }
}