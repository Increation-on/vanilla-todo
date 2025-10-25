// api.js - ИСПРАВЛЕННЫЙ
import { getTasks } from './storage.js'
import { addTaskFromSource } from './task-controller.js'
import { showToast } from './toast.js';

export const loadTaskFromAPI = async () => {
    const currentTasks = getTasks();

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        let data
        try {
            data = await response.json()
        } catch (parseError) {
            throw new Error('Invalid JSON response from server')
        }

        // 🎯 ПРОВЕРКА СТРУКТУРЫ ДАННЫХ
        if (!Array.isArray(data)) {
            throw new Error('API returned non-array data')
        }

        // 🎯 ПРОВЕРКА ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ
        data.forEach((item, index) => {
            if (!item.title || item.completed === undefined) {
                throw new Error(`Invalid task format at index ${index}`)
            }
        })

        const filteredTasks = data
            .map(({ title, completed, id }) => ({
                id: `api-${id}`,
                text: title,
                completed: completed
            }))
            .filter(apiTask => {
                return !currentTasks.some(existingTask =>
                    existingTask.id === apiTask.id ||
                    existingTask.text === apiTask.text
                )
            })

        if (filteredTasks.length > 0) {
            filteredTasks.forEach(task => {
                addTaskFromSource('api', task);
            })
            showToast(`Загружено ${filteredTasks.length} новых задач`, 'success')
        } else {
            showToast('Новых задач нет', 'info')
        }

    } catch (error) {
        console.error('Ошибка:', error)
        showToast(`Не удалось загрузить задачи: ${error.message}`, 'error')
    }
}