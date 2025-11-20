/**
 * Показывает или скрывает кнопку очистки поиска
 * в зависимости от переданного флага видимости
 * 
 * Используется когда пользователь вводит текст в поле поиска
 * или когда поиск очищается
 */
export const updateClearButton = (isVisible) => {
    // Находим кнопку очистки в DOM
    const clearButton = document.getElementById('clearSearch')
    
    // Если кнопка существует на странице, управляем её видимостью
    if (clearButton) {
        // block - показывает кнопку, none - полностью скрывает
        clearButton.style.display = isVisible ? 'block' : 'none'
    }
}