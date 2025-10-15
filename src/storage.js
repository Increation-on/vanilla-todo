/**
 * МОДУЛЬ: РАБОТА С ДАННЫМИ (storage.js)
 * Ответственность: управление состоянием приложения, работа с LocalStorage
 * Паттерн: Data Layer / Repository Pattern
 */

import { taskList } from './dom-elements.js'
import { addTask } from './task-manager.js';

// 🎯 ПАТТЕРН: Data Access Layer
// Все операции с хранилищем в одном месте

export const getCurrentTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (!savedTasks) return []; // ✅ ИСПРАВЛЕНО: Всегда возвращаем массив
    const tasksArray = JSON.parse(savedTasks);
    return tasksArray || []; // ✅ ДВОЙНАЯ ЗАЩИТА: На случай parse ошибок
}

export const renderTasks = (tasksArray) => {
    taskList.innerHTML = '';
    tasksArray.forEach(taskValue => {
        addTask(taskValue); // 🎯 Делегирование отрисовки
    });

}

export const saveTasksToLocalStorage = () => {
    // ✅ РЕФАКТОРИНГ: Цикл заменен на функциональную цепочку
    const tasksArray = [...taskList.children] // 🎯 NodeList → Array
        .map(task => {
            const textElement = task.querySelector('span')
            const checkbox = task.querySelector('input[type="checkbox"]')

            // 🛡️ ПАТТЕРН: Defensive Programming
            if (textElement && checkbox) {
                return { // 🎯 Data Transformation: DOM → Object
                    text: textElement.textContent,
                    completed: checkbox.checked,
                }
            }
            return null // 🎯 Явное указание отсутствия данных
        })
        .filter(task => task !== null) // 🎯 Data Cleaning: убираем битые элементы

    // 🛡️ ПАТТЕРН: Error Boundary
    try {
        localStorage.setItem('tasks', JSON.stringify(tasksArray))
    } catch (error) {
        console.error('Ошибка сохранения в LocalStorage: ', error)
        alert('Не удалось сохранить задачи: ', error) // 🎯 User Feedback
    }
}

export const loadTasksFromLocalStorage = () => {
    const tasksArray = getCurrentTasks()
    // 🎯 Clean Slate Pattern: очистка перед рендером

    // 🔄 ПАТТЕРН: Data to DOM Mapping
    renderTasks(tasksArray)
    return tasksArray
}



// 🚨 АРХИТЕКТУРНАЯ ПРОБЛЕМА: Split State Management
// Состояние размазано между DOM и LocalStorage
// 💡 РЕШЕНИЕ: Единый Source of Truth (Redux-like store)