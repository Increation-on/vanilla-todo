/**
 * МОДУЛЬ: УПРАВЛЕНИЕ DOM (dom-manager.js)
 * Ответственность: создание и отрисовка UI компонентов
 */

import { taskList } from './dom-elements.js'

export const createTaskElement = (task) => {
    const taskContainer = document.createElement('li')
    taskContainer.dataset.id = task.id // 🎯 ДОБАВЛЯЕМ ID!
    
    const taskText = document.createElement('span')
    const deleteButton = document.createElement('button')
    const checkbox = document.createElement('input')

    checkbox.type = 'checkbox'
    checkbox.checked = task.completed

    if (task.completed) {
        taskText.classList.add('completed')
    }

    deleteButton.textContent = 'Delete'
    taskText.textContent = task.text

    taskContainer.appendChild(taskText)
    taskContainer.appendChild(checkbox)
    taskContainer.appendChild(deleteButton)

    return { taskContainer, taskText, checkbox, deleteButton }
}

export const renderTask = (task) => {
    const elements = createTaskElement(task)
    taskList.appendChild(elements.taskContainer)
    return elements // 🎯 ВОЗВРАЩАЕМ ЭЛЕМЕНТЫ ДЛЯ ПРИВЯЗКИ СОБЫТИЙ
}