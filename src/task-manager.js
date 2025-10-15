/**
 * МОДУЛЬ: УПРАВЛЕНИЕ ЗАДАЧАМИ (task-manager.js)
 * Ответственность: создание и управление UI задачами, связь данных и DOM
 * Паттерн: Controller / Component Manager
 */

import { saveTasksToLocalStorage } from './storage.js'
import { deleteElement, toggleClass } from './dom-manipulation.js'
import { taskList, taskInput } from './dom-elements.js'

// 🎯 ПАТТЕРН: Optimized Save Scheduling
// Отложенное сохранение для группировки операций и актуального DOM
const scheduleSave = () => {
    setTimeout(saveTasksToLocalStorage, 0)
}

// 🎯 ПАТТЕРН: Pure DOM Factory  
// Чистая функция создания UI компонента (без side effects)
const createTaskElement = ({ text, completed }) => {
    const taskContainer = document.createElement('li')
    const taskText = document.createElement('span')
    const deleteButton = document.createElement('button')
    const checkbox = document.createElement('input')

    // 🔧 Конфигурация элементов
    checkbox.type = 'checkbox'
    checkbox.checked = completed

    if (completed) {
        taskText.classList.add('completed')
    }

    deleteButton.textContent = 'Delete'
    taskText.textContent = text

    // 🎯 ПАТТЕРН: Component Assembly
    // Чёткая сборка структуры компонента
    taskContainer.appendChild(taskText)
    taskContainer.appendChild(checkbox)
    taskContainer.appendChild(deleteButton)

    return { taskContainer, taskText, checkbox, deleteButton }
}

// 🎯 ПАТТЕРН: Event Binding Layer
// Отдельный слой для управления событиями компонента
const bindTaskEvents = (taskContainer, taskText, checkbox, deleteButton) => {
    deleteButton.addEventListener('click', () => {
        deleteElement(taskContainer)
        scheduleSave()
    })

    checkbox.addEventListener('change', () => {
        toggleClass(taskText, 'completed')
        scheduleSave()
    })
}

// 🎯 ПАТТЕРН: Data Validation
// Чистая функция валидации входных данных
const validateTask = (text) => {
    return text.trim() !== ''
}

// 🎯 ПАТТЕРН: Component Coordinator
// Основная функция координирует создание и связывание компонента
export const addTask = ({ text = '', completed = false } = {}) => {
    // 🎯 ПАТТЕРН: Unified Interface
    // Функция работает и с новыми задачами, и с восстановленными из хранилища
    const inputValue = text || taskInput.value
    
    // 🛡️ Валидация данных
    if (!validateTask(inputValue)) return

    // 🎯 ЧЕТКОЕ РАЗДЕЛЕНИЕ ОТВЕТСТВЕННОСТИ:
    // 1. Создание DOM структуры
    const { taskContainer, taskText, checkbox, deleteButton } = createTaskElement({
        text: inputValue, 
        completed
    })
    
    // 2. Добавление в UI
    taskList.appendChild(taskContainer)
    
    // 3. Привязка обработчиков событий
    bindTaskEvents(taskContainer, taskText, checkbox, deleteButton)

    // 4. Очистка поля ввода
    taskInput.value = ''

    // 5. Сохранение состояния
    scheduleSave()
}

// 💡 ДОПОЛНИТЕЛЬНЫЕ УЛУЧШЕНИЯ:
// - Добавить UI feedback при валидации (подсветка ошибок)
// - Реализовать отмену действий (undo/redo)
// - Добавить анимации при добавлении/удалении задач