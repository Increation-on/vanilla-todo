// task-controller.js - ИСПРАВЛЕННЫЙ
import {
    addTask as addTaskToStorage,
    getTasks as getTasksFromStorage,
    removeTask,
    toggleTask
} from './storage.js'
import { deleteElement, toggleClass } from './dom-manipulation.js'
import { renderTask } from './dom-manager.js'
import { taskInput } from './dom-elements.js'

// 🎯 Валидация
const validateTask = (text) => text.trim() !== ''

// 🎯 Привязка событий
export const bindTaskEvents = (taskContainer, taskText, checkbox, deleteButton, taskId) => {

    
    deleteButton.addEventListener('click', () => {
       
        removeTask(taskId)
        deleteElement(taskContainer)
    })

    checkbox.addEventListener('change', () => {
        
        toggleTask(taskId)
        toggleClass(taskText, 'completed')
    })
}

// 🎯 Универсальный addTask (ПЕРЕИМЕНОВАН)
export const addTaskFromSource = (source, data) => {
    switch (source) {
        case 'user':
            const newTask = addTaskToStorage(data.text)
            const elements = renderTask(newTask)
            bindTaskEvents(elements.taskContainer, elements.taskText, elements.checkbox, elements.deleteButton, newTask.id)
            break
        case 'storage':
            const storageElements = renderTask(data)
            bindTaskEvents(storageElements.taskContainer, storageElements.taskText, storageElements.checkbox, storageElements.deleteButton, data.id)
            break
        case 'api':
            const apiTask = addTaskToStorage({
                id: data.id,
                text: data.text,
                completed: data.completed
            })
            const apiElements = renderTask(apiTask)
            bindTaskEvents(apiElements.taskContainer, apiElements.taskText, apiElements.checkbox, apiElements.deleteButton, data.id)
            break
    }
}

// 🎯 Обработчик новой задачи
export const handleNewTask = () => {
    const text = taskInput.value
    if (!validateTask(text)) return
    taskInput.value = ''
    addTaskFromSource('user', { text })
}

// 🎯 Инициализация
export const initializeApp = () => {
    const savedTasks = getTasksFromStorage()
   
    savedTasks.forEach((task) => {
        const elements = renderTask(task)
        bindTaskEvents(elements.taskContainer, elements.taskText, elements.checkbox, elements.deleteButton, task.id)
        
    })
    
    console.log('Инициализация завершена')
}