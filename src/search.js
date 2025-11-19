// search.js
import { getTasksFromStorage } from './storage.js';
import { createTaskElement, renderTask } from './dom-manager.js';
import { bindTaskEventHandlers as bindTaskEvents } from './task-event-binder.js';
import { debounce } from './utils/debounce.js';
import { escapeHtml } from './utils/escape.js';
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
        const { taskContainer, taskText, checkbox, deleteButton, editButton, id } = createTaskElement(task, searchTerm);
        renderTask(taskContainer);
        bindTaskEvents(taskContainer, taskText, checkbox, deleteButton, editButton, id);
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

const showAutocomplete = (searchTerm) => {
    const autocompleteList = document.getElementById('autocompleteList');
    if (!autocompleteList) return;

    if (!searchTerm.trim()) {
        autocompleteList.innerHTML = '';
        return;
    }

    const tasks = getTasksFromStorage();
    const suggestions = tasks
        .filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5); // топ-5 подсказок

    autocompleteList.innerHTML = suggestions.map(task =>
        `<div class="autocomplete-item">${escapeHtml(task.text)}</div>`
    ).join('');

    // Обработчик клика по подсказке
    autocompleteList.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('searchInput').value = item.textContent;
            performSearch(item.textContent);
            autocompleteList.innerHTML = '';
        });
    });
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
            showAutocomplete('')
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
        const searchTerm = e.target.value;
        handleSearch(searchTerm);
        showAutocomplete(searchTerm); // 🔥 показываем подсказки
        updateClearButton();
    });
};
