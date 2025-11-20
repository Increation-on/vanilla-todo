/**
 * Показывает подсказки автодополнения под полем поиска
 * 
 * Когда пользователь вводит текст, появляются подсказки из существующих задач
 * При клике на подсказку - она вставляется в поле поиска и сразу выполняется поиск
 */
import { getTasksFromStorage } from "../storage"
import { escapeHtml } from "../utils/escape";
import { performSearch } from "./search-logic";

export const showAutocomplete = (searchTerm) => {
    // Находим контейнер для подсказок
    const autocompleteList = document.getElementById('autocompleteList');
    if (!autocompleteList) return;

    // Если поиск пустой - очищаем подсказки и выходим
    if (!searchTerm.trim()) {
        autocompleteList.innerHTML = '';
        return;
    }

    // Ищем задачи, содержащие текст поиска
    const tasks = getTasksFromStorage();
    const suggestions = tasks
        .filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5); // Ограничиваем 5 подсказками

    // Создаем HTML для подсказок
    autocompleteList.innerHTML = suggestions.map(task =>
        `<div class="autocomplete-item">${escapeHtml(task.text)}</div>`
    ).join(''); // join('') превращает массив в одну строку

    // Вешаем обработчики клика на каждую подсказку
    autocompleteList.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
            // При клике: вставляем текст подсказки в поле поиска
            document.getElementById('searchInput').value = item.textContent;
            // Выполняем поиск по этому тексту
            performSearch(item.textContent);
            // Очищаем подсказки после выбора
            autocompleteList.innerHTML = '';
        });
    });
};