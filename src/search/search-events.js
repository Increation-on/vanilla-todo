// search-events.js - ТОЛЬКО события
import { createSearchHandlers } from "./search-handlers";

/**
 * Настраивает все события для поиска
 * 
 * Этот модуль - мост между DOM событиями и логикой приложения
 * Он только вешает и снимает обработчики, не содержа бизнес-логики
 */
export const setupSearchEvents = (searchInput, callbacks) => {
    // Получаем готовые обработчики из отдельного модуля
    // Теперь search-events не знает КАК обрабатываются события, только КОГДА
    const { handleInput, handleClear } = createSearchHandlers(callbacks);
    
    // Подписываемся на ввод текста - реагируем на каждое изменение
    searchInput.addEventListener('input', handleInput);
    
    // Находим кнопку очистки (может не существовать на странице)
    // ?. - опциональная цепочка: если clearButton существует, тогда вешаем обработчик
    const clearButton = document.getElementById('clearSearch');
    clearButton?.addEventListener('click', handleClear);
    
    // Возвращаем функцию для отписки от событий
    // Полезно если поиск нужно временно отключить или переинициализировать
    return () => {
        searchInput.removeEventListener('input', handleInput);
        clearButton?.removeEventListener('click', handleClear);
    };
};