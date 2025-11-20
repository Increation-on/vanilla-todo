// search.js - главный координатор поиска
import { performSearch } from './search-logic.js'
import { showAutocomplete } from './autocomplete.js'
import { updateClearButton } from './search-ui.js';
import { setupSearchEvents } from './search-events.js'

/**
 * Инициализирует всю систему поиска, связывая вместе все модули
 * 
 * Этот файл - главный диспетчер, который:
 * - Находит поле поиска в DOM
 * - Настраивает все обработчики событий через search-events
 * - Связывает бизнес-логику с пользовательскими действиями
 * - Устанавливает начальное состояние интерфейса
 * 
 * Сам не содержит логики, только координацию - как дирижёр оркестра
 */
export const initSearch = () => {
    // Находим поле ввода поиска - главный элемент управления
    const searchInput = document.getElementById('searchInput')
    searchInput.autocomplete = 'off'

    // Если поля поиска нет на странице, выходим - поиск не нужен
    if (!searchInput) return

    // Настраиваем все события поиска и получаем колбэки для реактивности
    // searchInput передаём явно, чтобы search-events не зависел от DOM-поиска
    setupSearchEvents(searchInput, {
        // Колбэк поиска: вызывается когда пользователь вводит текст
        // Debounce 300ms автоматически применяется в search-handlers
        onSearch: performSearch,

        // Колбэк очистки: вызывается когда пользователь жмёт крестик
        // Координирует несколько действий для полной очистки интерфейса
        onClear: () => {
            searchInput.value = ''           // Очищаем поле ввода
            performSearch('')                // Показываем все задачи (пустой поиск)
            showAutocomplete('')             // Убираем подсказки автодополнения
            updateClearButton(false)         // Скрываем кнопку очистки
        },

        // Колбэк автодополнения: показываем подсказки при вводе
        // Вызывается сразу без debounce для мгновенной обратной связи
        onAutocomplete: showAutocomplete,

        // Колбэк обновления UI: управляем видимостью кнопки очистки
        // Вызывается при каждом изменении текста для реактивного интерфейса
        onUIUpdate: updateClearButton
    });

    // Устанавливаем начальное состояние интерфейса
    // Крестик очистки скрыт, так как поле поиска изначально пустое
    updateClearButton(false);
};