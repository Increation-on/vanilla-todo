import { getCurrentTasks } from './storage.js'
import { addTask } from './task-manager.js'

/**
 * МОДУЛЬ: API ИНТЕГРАЦИИ
 * Ответственность: работа с внешними данными, преобразование, фильтрация дубликатов
 */
export const loadTaskFromAPI = async () => {
    // 🎯 ПАТТЕРН: Dependency Injection через импорты
    const currentTasks = getCurrentTasks();

    try {
        // 🌐 СЛОЙ: Сетевые запросы
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
        
        // 🛡️ ПАТТЕРН: Защитное программирование
        if (!response.ok) {
            throw new Error('Failed to fetch')
        }

        // 🔄 ПАТТЕРН: Functional Data Pipeline
        // Единая цепочка преобразований: API → доменная модель → фильтрация
        const data = await response.json()
        const filteredTasks = data
            .map(({title, completed}) => ({ // 🎯 ДЕСТРУКТУРИЗАЦИЯ: прямое извлечение полей
                text: title,          // Маппинг поля title -> text
                completed: completed, 
                source: 'api'
            }))
            .filter(apiTask =>  // 🎯 ФИЛЬТРАЦИЯ: устранение дубликатов на уровне данных
                !currentTasks.some(existingTask => 
                    existingTask.text === apiTask.text
                )
            );

        // 🔄 ПАТТЕРН: Side Effects Management
        // Чистые преобразования выше, side effects отдельно
        filteredTasks.forEach(taskValue => {
            addTask(taskValue);
        })

    } catch (error) {
        // 🛡️ ПАТТЕРН: Error Boundary + User Feedback
        console.error('Failed to load tasks from API:', error)
        alert('Не удалось загрузить задачи с сервера. Проверьте подключение к интернету.')
        // ✅ ДЫРА ИСПРАВЛЕНА: Пользователь получает понятное уведомление
    }
}

// 💡 ВОЗМОЖНЫЕ УЛУЧШЕНИЯ:
// - Retry логика при неудачных запросах
// - Вынос URL API в конфигурацию
// - Индикатор загрузки для улучшения UX
// - Кэширование запросов