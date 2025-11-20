// search-logic.js
import { showTasksList } from "./search-results";
import { getTasksFromStorage } from "../storage";

/**
 * Выполняет поиск задач и показывает результаты
 * 
 * Если поисковый запрос пустой - показывает все задачи
 * Если есть текст - фильтрует задачи по совпадениям
 * Всегда работает с актуальными данными из хранилища
 */
export const performSearch = (searchTerm) => {
    // Получаем актуальный список задач из хранилища
    const tasks = getTasksFromStorage();

    // Если пользователь очистил поиск или ввел только пробелы
    if (!searchTerm.trim()) {
        console.log('Поиск пустой - показываем все задачи');
        
        // Показываем все задачи без фильтрации
        showTasksList(tasks);
        return;
    }

    // Фильтруем задачи: оставляем только те,
    // где текст задачи содержит поисковый запрос (без учета регистра)
    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log('Найдено задач:', filteredTasks.length);

    // Показываем отфильтрованные результаты
    // searchTerm передается для подсветки найденного текста в интерфейсе
    showTasksList(filteredTasks, searchTerm);
};