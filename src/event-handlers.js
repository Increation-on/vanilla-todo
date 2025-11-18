// event-handlers.js
import { addBtn, addApiTasksButton } from './dom-elements.js'
import { loadTaskFromAPI } from './api.js'
import { handleNewTask, initializeTasks } from './task-controller.js'
import { initRouter } from './router.js'
import { AuthForm } from './auth/auth-form.js'
import { AuthManager } from './auth/auth-manager.js'
import { initSearch } from './search.js'

/**
 * ГЛАВНЫЙ ЗАПУСК ПРИЛОЖЕНИЯ
 */
export const initApp = () => {
    // Всегда обновляем header
    updateAuthHeader();
    
    // Проверяем авторизацию
    if (!AuthManager.isLoggedIn()) {
        showAuthForm();
    } else {
        showTodoApp();
    }
}

/**
 * ОБНОВЛЯЕМ HEADER В ЗАВИСИМОСТИ ОТ АВТОРИЗАЦИИ
 */
const updateAuthHeader = () => {
    const authInfo = document.getElementById('auth-info');
    const userEmail = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (AuthManager.isLoggedIn()) {
        // Показываем информацию о пользователе
        authInfo.style.display = 'flex';
        userEmail.textContent = localStorage.getItem('userEmail');
        
        // Настраиваем кнопку выхода
        logoutBtn.onclick = () => {
            AuthManager.logout();
            initApp(); // перезапускаем приложение
        };
    } else {
        // Скрываем информацию о пользователе
        authInfo.style.display = 'none';
    }
}

/**
 * ПОКАЗЫВАЕМ ФОРМУ АВТОРИЗАЦИИ (скрываем задачи)
 */
const showAuthForm = () => {
    console.log('📝 Showing auth form');
    
    // Скрываем контейнер с задачами
    const container = document.querySelector('.container');
    if (container) {
        container.style.display = 'none';
    }
    
    // Убираем старую форму если есть
    const oldAuthContainer = document.getElementById('auth-container');
    if (oldAuthContainer) {
        oldAuthContainer.remove();
    }
    
    // Создаем контейнер для формы
    const authContainer = document.createElement('div');
    authContainer.id = 'auth-container';
    document.body.appendChild(authContainer);
    
    // Рендерим форму
    AuthForm.render(authContainer);
}

/**
 * ПОКАЗЫВАЕМ ТУДУ-ЛИСТ (скрываем форму)
 */
const showTodoApp = () => {
    console.log('📋 Showing todo app');
    
    // Показываем контейнер с задачами
    const container = document.querySelector('.container');
    if (container) {
        container.style.display = 'block';
    }
    
    // Убираем форму авторизации если есть
    const authContainer = document.getElementById('auth-container');
    if (authContainer) {
        authContainer.remove();
    }
    
    // Инициализируем туду-функциональность
    initializeTasks();
    initGlobalEventHandlers();
    initRouter();

    initSearch();
}

/**
 * Настраивает глобальные обработчики событий для туду-листа
 */
export const initGlobalEventHandlers = () => {
    addBtn.addEventListener('click', handleNewTask);
    addApiTasksButton.addEventListener('click', loadTaskFromAPI);
}