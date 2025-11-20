// search-results.js
import { createTaskElement, renderTask } from '../dom-manager.js';
import { bindTaskEventHandlers as bindTaskEvents } from '../task-event-binder.js';

/**
 * Показывает список задач в интерфейсе
 * 
 * Очищает предыдущие результаты, показывает "не найдено" если задач нет,
 * или отрисовывает переданные задачи с помощью системных функций
 */
export const showTasksList = (tasks, searchTerm = '') => {
    // Находим контейнер для списка задач
    const taskList = document.getElementById('taskList');

    // Если контейнера нет на странице - выходим
    if (!taskList) return;

    // Очищаем предыдущие результаты поиска
    // Это важно чтобы не копились старые задачи при новом поиске
    taskList.innerHTML = '';

    // Если задач нет - показываем сообщение "не найдено"
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="no-results">No tasks found</li>';
        return;
    }

    // Для каждой задачи создаем DOM-элемент и отрисовываем его
    tasks.forEach(task => {
        // Создаем все необходимые DOM-элементы для задачи
        const { taskContainer, taskText, checkbox, deleteButton, editButton, id } = createTaskElement(task, searchTerm);
        
        // Добавляем задачу в интерфейс
        renderTask(taskContainer);
        
        // Вешаем обработчики событий (редактирование, удаление, переключение)
        bindTaskEvents(taskContainer, taskText, checkbox, deleteButton, editButton, id);
    });
};