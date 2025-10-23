/**
 * МОДУЛЬ: ОБРАБОТЧИКИ СОБЫТИЙ И ИНИЦИАЛИЗАЦИЯ
 * ОБНОВЛЕН: использует новую архитектуру (storage.js + task-controller.js)
 */

import { addBtn, addApiTasksButton } from './dom-elements.js'
import { loadTaskFromAPI } from './api.js'
import { handleNewTask, initializeApp } from './task-controller.js'

export const initEventHandlers = () => {
    addBtn.addEventListener('click', handleNewTask)
    addApiTasksButton.addEventListener('click', loadTaskFromAPI)
}

export const initApp = () => {
    initializeApp()
}