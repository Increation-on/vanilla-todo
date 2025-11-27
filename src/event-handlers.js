import { addBtn, addApiTasksButton, taskInput } from './dom-elements.js'
import { loadTaskFromAPI } from './api.js'
import { handleNewTask, initializeTasks } from './task-controller.js'
import { initRouter } from './router.js'
import { AuthManager } from './auth/auth-manager.js'
import { initSearch } from './search/search.js'
import { resetTaskStorage } from './storage.js'
import { AuthViewController } from './view-controllers/auth-view.js'
import { TodoViewController } from './view-controllers/todo-view.js'
import { LayoutViewController } from './view-controllers/layout-view.js'

/**
 * ОБРАБОТЧИК ПРОСРОЧКИ ТОКЕНА
 */
window.addEventListener('authExpired', () => {
    console.log('🎯 authExpired event received!')
    resetTaskStorage()
    initApp()
})

/**
 * ГЛАВНЫЙ ЗАПУСК ПРИЛОЖЕНИЯ
 */
export const initApp = () => {
    // Всегда обновляем header
    LayoutViewController.updateAuthHeader(() => {
        AuthManager.logout()
        resetTaskStorage()
        initApp()
    })

    resetTaskStorage()

    // Проверяем авторизацию
    if (!AuthManager.isLoggedIn()) {
        // ПОКАЗЫВАЕМ ФОРМУ АВТОРИЗАЦИИ
        TodoViewController.hideTodoApp()
        AuthViewController.showAuthForm(() => {
            resetTaskStorage()
            initApp()
        })
    } else {
        // ПОКАЗЫВАЕМ ТУДУ-ЛИСТ
        AuthManager.startTokenWatch()
        AuthViewController.removeAuthForm()
        TodoViewController.showTodoApp()
        
        // Инициализируем функциональность
        initializeTasks()
        initGlobalEventHandlers()
        initRouter()
        initSearch()
    }
}

/**
 * Настраивает глобальные обработчики событий для туду-листа
 */
export const initGlobalEventHandlers = () => {
    addBtn.addEventListener('click', handleNewTask)
    addApiTasksButton.addEventListener('click', loadTaskFromAPI)

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleNewTask()
        }
    })
}