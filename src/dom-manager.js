/**
 * МОДУЛЬ: DOM MANAGER (dom-manager.js)
 * 
 * ЗАЧЕМ НУЖЕН: Превращает данные задач в готовые DOM-элементы
 * 
 * АРХИТЕКТУРА:
 * - createTaskElement: фабрика элементов (только создает, не добавляет в DOM)  
 * - renderTask: только добавляет готовые элементы в DOM
 * 
 * ПРИНЦИП: Разделение создания и рендеринга для гибкости
 */

import { taskList } from './dom-elements.js'
import { escapeRegex, escapeHtml } from './utils/escape.js'

/**
 * Фабрика по созданию DOM-элементов для одной задачи
 * 
 * СОЗДАЕТ структуру:
 * <li data-id="123">
 *   <span>Текст задачи</span>
 *   <input type="checkbox">
 *   <button>Delete</button>
 * </li>
 * 
 * ВОЗВРАЩАЕТ все созданные элементы для привязки событий
 */
export const createTaskElement = (task, searchTerm = '') => {
    console.log('🔧 createTaskElement вызван для задачи:', task.text)
    // Основа - контейнер задачи с ID для связи с данными
    const taskContainer = document.createElement('li')
    taskContainer.dataset.id = task.id
    
    // Внутренние элементы
    const taskText = document.createElement('span')
    const deleteButton = document.createElement('button')
    const checkbox = document.createElement('input')

    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.className = 'edit-btn'

    // Настраиваем чекбокс согласно данным задачи
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed

    // Визуально помечаем завершенные задачи
    if (task.completed) {
        taskText.classList.add('completed')
    }

    // Заполняем контент
    deleteButton.textContent = 'Delete'
    
    if (searchTerm && searchTerm.trim()) {
         const escapedTerm = escapeRegex(searchTerm)
        const highlightedText = task.text.replace(
            new RegExp(escapedTerm, 'gi'),
            match => `<mark class="search-highlight">${escapeHtml(match)}</mark>`
        );
        taskText.innerHTML = highlightedText; // innerHTML вместо textContent
    } else {
        taskText.textContent = task.text;
    }

    // Собираем иерархию
    taskContainer.appendChild(taskText)
    taskContainer.appendChild(checkbox)
    taskContainer.appendChild(editButton)
    taskContainer.appendChild(deleteButton)

     console.log('🔧 Все элементы добавлены в taskContainer') // ← ДОБАВЬ

    // Возвращаем все элементы для дальнейшей работы
    return { 
        taskContainer, 
        taskText, 
        checkbox, 
        deleteButton,
        editButton, 
        id: task.id 
    }
}

/**
 * Добавляет готовый DOM-элемент задачи в список на странице
 * 
 * ПРИНИМАЕТ: уже созданный taskContainer
 * НЕ СОЗДАЕТ: элементы (это задача createTaskElement)
 * 
 * ИСПОЛЬЗОВАТЬ: когда элементы уже созданы и нужно показать их пользователю
 */
export const renderTask = (taskContainer) => {
    taskList.appendChild(taskContainer)
}