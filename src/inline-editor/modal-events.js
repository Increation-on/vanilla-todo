import { getModalElements, createCloseHandlers, createValidationHandler } from './modal-handlers.js'
import { updateTaskText } from '../storage.js'

export function bindModalEvents(modal, taskId, currentText, onTextUpdate) {
    // 🎯 Основная функция-оркестратор для привязки всех событий модалки
    // 📌 Собирает вместе все обработчики и координирует их работу

    // 🔍 Получаем ссылки на все DOM-элементы модалки
    const { overlay, input, saveBtn, cancelBtn } = getModalElements(modal)

    // 🛠️ Создаем набор обработчиков с помощью фабричных функций
    const { closeModal, handleEscape } = createCloseHandlers(modal)  // 🚪 Обработчики закрытия
    const handleValidation = createValidationHandler(input, currentText, saveBtn)  // ✅ Валидация

    // ⚡ Инициализация начального состояния
    handleValidation()  // 🔄 Проверяем валидность при открытии модалки
    document.addEventListener('keydown', handleEscape)  // ⌨️ Глобальный обработчик Escape
    modal._escapeHandler = handleEscape  // 💾 Сохраняем ссылку для последующей очистки

    // 🎮 Навешиваем обработчики событий на элементы:

    // ⌨️ Обработка клавиш в поле ввода
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !saveBtn.disabled) saveBtn.click()  // ✅ Enter для сохранения
        if (e.key === 'Escape') closeModal()  // ❌ Escape для отмены
    })

    // 📝 Валидация при каждом изменении текста
    input.addEventListener('input', handleValidation)

    // 💾 Обработчик сохранения изменений
    saveBtn.addEventListener('click', () => {
        const newText = input.value.trim()
        if (!newText || newText === currentText) return  // 🛑 Проверяем, что текст изменился

        // 💾 Сохраняем изменения:
        updateTaskText(taskId, newText)  // 📦 В хранилище
        if (typeof onTextUpdate === 'function') {
            onTextUpdate(taskId, newText)  // 🔄 В DOM (через колбэк)
        }
        closeModal()  // 🚪 Закрываем модалку после сохранения
    })

    // ❌ Обработчики отмены/закрытия
    cancelBtn.addEventListener('click', closeModal)  // 👉 Клик по кнопке Cancel
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal()  // 👆 Клик по оверлею (вне контента)
    })
}