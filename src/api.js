// api.js - ИСПРАВЛЕННЫЙ
import { getTasks } from './storage.js'
import { addTaskFromSource } from './task-controller.js'

export const loadTaskFromAPI = async () => {
    const currentTasks = getTasks();

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
        const data = await response.json()

        const filteredTasks = data
            .map(({title, completed, id}) => ({
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
        
        filteredTasks.forEach(task => {
            addTaskFromSource('api', task);
        })

    } catch (error) {
        console.error('Ошибка:', error)
    }
}