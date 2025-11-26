import { escapeAttr } from '../utils/escape.js'
import { bindModalEvents } from './modal-events.js'

export function createModal(taskId, currentText, onTextUpdate) {
    // 🎯 Создает DOM-структуру модального окна редактирования
    // 📌 Возвращает готовый DOM-элемент модалки (еще не добавленный в документ)
    
    const modal = document.createElement('div')
    modal.className = 'edit-modal'  // 🎨 Основной CSS-класс для стилизации

    // 🏗️ Собираем HTML-структуру модалки
    // 🛡️ escapeAttr защищает от XSS-атак при подстановке пользовательского текста
    modal.innerHTML = `
        <div class="edit-modal__overlay">
            <div class="edit-modal__content">
                <h3 class="edit-modal__title">Edit Task</h3>
                <input 
                    type="text" 
                    class="edit-modal__input" 
                    value="${escapeAttr(currentText)}"
                    placeholder="Task text..."
                >
                <div class="edit-modal__actions">
                    <button class="edit-modal__btn edit-modal__btn--save">Save</button>
                    <button class="edit-modal__btn edit-modal__btn--cancel">Cancel</button>
                </div>
            </div>
        </div>
    `
    
    // 🔗 Подключаем все обработчики событий к созданной модалке
    bindModalEvents(modal, taskId, currentText, onTextUpdate)
    
    return modal  // 📤 Возвращаем готовый элемент (еще не показан пользователю)
}

export function openEditModal(taskId, currentText, onTextUpdate) {
    // 🚀 Функция для открытия модалки редактирования
    // 📌 Создает модалку и добавляет ее в DOM для показа пользователю
    
    const modal = createModal(taskId, currentText, onTextUpdate)
    document.body.appendChild(modal)  // 📝 Добавляем модалку в конец body
}