/**
 * Создает обработчики событий для поиска с debounce-логикой
 * 
 * Этот модуль - "мозг" реактивного поиска, который:
 * - Оптимизирует производительность через debounce
 * - Координирует вызовы разных модулей поиска
 * - Разделяет обработку событий от бизнес-логики
 */
import { debounce } from '../utils/debounce.js'

export const createSearchHandlers = (callbacks) => {
    // Достаем все колбэки которые нам передали из search.js
    const { onSearch, onClear, onAutocomplete, onUIUpdate } = callbacks;

    // Создаем "заторможенную" версию поиска - срабатывает через 300мс после последнего ввода
    const handleSearch = debounce(onSearch, 300);

    // Обработчик ввода в реальном времени
    const handleInput = (event) => {
        const searchTerm = event.target.value;

        // Запускаем поиск (с debounce)
        handleSearch(searchTerm);
        // Показываем подсказки (без задержки)
        onAutocomplete(searchTerm);
        // Обновляем UI (показываем/скрываем крестик)
        onUIUpdate(!!searchTerm); // Boolean: есть текст или нет
    };

    // Обработчик очистки поиска
    const handleClear = () => {
        onClear(); // Вызываем колбэк очистки из search.js
    };

    // Возвращаем обработчики для использования в search.js
    return { handleInput, handleClear };
};