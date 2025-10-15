/**
 * МОДУЛЬ: ОБРАБОТЧИКИ СОБЫТИЙ И ИНИЦИАЛИЗАЦИЯ
 * Ответственность: настройка приложения, связывание компонентов
 * Паттерн: Application Bootstrap / Composition Root
 */

import { addBtn, addApiTasksButton } from './dom-elements.js'
import { addTask } from './task-manager.js'
import { loadTasksFromLocalStorage } from './storage.js'
import { loadTaskFromAPI } from './api.js'

// 🎯 ПАТТЕРН: Dependency Composition
// Все зависимости собираются в одном месте - легко видеть структуру приложения

// Инициализация всех обработчиков событий
export const initEventHandlers = () => {
    addBtn.addEventListener('click', addTask)
    addApiTasksButton.addEventListener('click', loadTaskFromAPI)
    // 💡 КОММЕНТАРИЙ: Чистая композиция - нет бизнес-логики
    // Просто связываем элементы с обработчиками
}

// Инициализация при загрузке DOM
export const initApp = () => {
    loadTasksFromLocalStorage()
    // 🎯 ПАТТЕРН: Separated Initialization
    // Загрузка данных отдельно от настройки событий
    // Позволяет тестировать инициализацию по частям
}

// 🔧 АРХИТЕКТУРА: Этот модуль - "клей" между всеми компонентами
// Знает о всей системе, но не содержит бизнес-логики

// 🚨 ДЫРА: Нет обработки ошибок инициализации
// Что если DOM элементы не найдены?
// Что если LocalStorage недоступен?

// 💡 ВОЗМОЖНОЕ УЛУЧШЕНИЕ:
// Добавить валидацию перед добавлением обработчиков:
// if (addBtn) addBtn.addEventListener(...)
// else console.warn('Add button not found')