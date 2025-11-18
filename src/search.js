// search.js
import { getTasksFromStorage } from './storage.js';
import { createTaskElement, renderTask } from './dom-manager.js';
import { bindTaskEventHandlers as bindTaskEvents } from './task-event-binder.js';
import { debounce } from './utils/debounce.js';

// 🎯 Функция для отображения задач
const showTasksList = (tasks, searchTerm = '') => {
    const taskList = document.getElementById('taskList');

    if (!taskList) return;

    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="no-results">No tasks found</li>';
        return;
    }

    // Используем твои существующие функции
    tasks.forEach(task => {
        const { taskContainer, taskText, checkbox, deleteButton, id } = createTaskElement(task, searchTerm);
        renderTask(taskContainer);
        bindTaskEvents(taskContainer, taskText, checkbox, deleteButton, id);
    });
};

const performSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
        console.log('Поиск пустой - показываем все задачи');
        // 🎯 Показываем все задачи
        const allTasks = getTasksFromStorage();
        showTasksList(allTasks);
        return;
    }

    const tasks = getTasksFromStorage();
    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log('Найдено задач:', filteredTasks.length);

    // 🎯 Показываем результаты поиска
    showTasksList(filteredTasks, searchTerm);
};

// Остальной код без изменений...
export const initSearch = () => {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');

    if (!searchInput) return;

    console.log('🔍 Search initialized');
    // Показываем/скрываем крестик
    const updateClearButton = () => {
        if (clearButton) {
            clearButton.style.display = searchInput.value ? 'block' : 'none';
        }
    };

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            performSearch(''); // Сбрасываем поиск
            updateClearButton();
        });
    }

    // Обновляем видимость крестика при вводе
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
        updateClearButton();
    });

    // Инициализация
    updateClearButton();

    const handleSearch = debounce((searchTerm) => {
        performSearch(searchTerm);
    }, 300);

    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });
};
