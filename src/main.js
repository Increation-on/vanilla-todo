/**
 * МОДУЛЬ: ТОЧКА ВХОДА ПРИЛОЖЕНИЯ (main.js)
 * Ответственность: запуск приложения, обработка жизненного цикла
 * Паттерн: Entry Point / Main Module
 */

import { initEventHandlers, initApp } from './event-handlers.js'
import { initRouter } from './router.js'

// 🎯 ПАТТЕРН: Application Lifecycle Management
// Единая точка входа - знает КОГДА и КАК запускать приложение

// Запуск приложения когда DOM готов
document.addEventListener('DOMContentLoaded', () => {
    initApp()          // Загружаем задачи из LocalStorage
    initEventHandlers() // Вешаем обработчики событий
    initRouter()
    // 💡 КОММЕНТАРИЙ: Правильная последовательность инициализации
    // 1. Сначала данные (могут влиять на DOM)
    // 2. Потом обработчики (ждут готового DOM)
})

// 🎯 ПАТТЕРН: Event-Driven Architecture
// Приложение запускается по событию, а не сразу

// 🔧 АРХИТЕКТУРА: Этот файл - "мозг" запуска приложения
// Минимальная логика, максимум семантики

// 🚨 ДЫРА: Нет обработки глобальных ошибок
// window.addEventListener('error', ...) для отлова непойманных исключений

// 💡 ВОЗМОЖНОЕ УЛУЧШЕНИЕ:
// Добавить индикатор загрузки перед DOMContentLoaded
// Добавить cleanup при beforeunload если понадобится