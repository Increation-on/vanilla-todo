import { updateTaskText } from '../storage.js'
import { escapeHtml, escapeAttr } from '../utils/escape.js'
import './inline-editor.css'

export function initInlineEditor(editButton, taskId, currentText, onTextUpdate) {

    console.log('🔧 initInlineEditor: onTextUpdate =', onTextUpdate) // ← ДОБАВЬ ЭТО
    console.log('🔧 initInlineEditor: typeof onTextUpdate =', typeof onTextUpdate) // ← И ЭТО

    editButton.addEventListener('click', (e) => {
        e.stopPropagation()
        openEditModal(taskId, currentText, onTextUpdate)
    })
}

function openEditModal(taskId, currentText, onTextUpdate) {

    console.log('🔧 openEditModal: onTextUpdate =', onTextUpdate) // ← ДОБАВЬ
    console.log('🔧 openEditModal: typeof onTextUpdate =', typeof onTextUpdate) // ← ДОБАВЬ
    const modal = createModal(taskId, currentText, onTextUpdate)
    document.body.appendChild(modal)
}

function createModal(taskId, currentText, onTextUpdate) {

    console.log('🔧 createModal: onTextUpdate =', onTextUpdate) // ← ДОБАВЬ
    console.log('🔧 createModal: typeof onTextUpdate =', typeof onTextUpdate) // ← ДОБАВЬ
    const modal = document.createElement('div')
    modal.className = 'edit-modal'

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
    bindModalEvents(modal, taskId, currentText, onTextUpdate)
    return modal
}

function bindModalEvents(modal, taskId, currentText, onTextUpdate) {

    console.log('🎯 bindModalEvents ВЫЗВАНА!')
    console.log('🔧 modal:', modal)
    console.log('🔧 taskId:', taskId)
    console.log('🔧 currentText:', currentText)
    console.log('🔧 onTextUpdate:', onTextUpdate)

    const overlay = modal.querySelector('.edit-modal__overlay')
    const input = modal.querySelector('.edit-modal__input')
    const saveBtn = modal.querySelector('.edit-modal__btn--save')
    const cancelBtn = modal.querySelector('.edit-modal__btn--cancel')

    const validateInput = () => {
        const newText = input.value.trim()
        const isValid = newText && newText !== currentText

        // Делаем кнопку активной/неактивной
        saveBtn.disabled = !isValid

        // Меняем стиль для визуальной обратной связи
        if (isValid) {
            saveBtn.classList.remove('edit-modal__btn--disabled')
        } else {
            saveBtn.classList.add('edit-modal__btn--disabled')
        }
    }

    // 🎯 Проверяем при загрузке
    validateInput()

    // 🎯 Обработка клавиш в input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // Enter для сохранения (только если кнопка активна)
            if (!saveBtn.disabled) {
                saveBtn.click()
            }
        }
        if (e.key === 'Escape') {
            // Escape для отмены
            closeModal()
        }
    })

    // 🎯 Проверяем при каждом вводе
    input.addEventListener('input', validateInput)

    console.log('🔧 Элементы найдены:')
    console.log('  - overlay:', overlay)
    console.log('  - input:', input)
    console.log('  - saveBtn:', saveBtn)
    console.log('  - cancelBtn:', cancelBtn)

    const closeModal = () => modal.remove()

    saveBtn.addEventListener('click', () => {
        const newText = input.value.trim()
        console.log('🔧 Save clicked. newText:', newText, 'currentText:', currentText)
        if (!newText || newText === currentText) return
        if (newText && newText !== currentText) {
            console.log('🔧 Условие прошло')

            // 🎯 СОХРАНЯЕМ В LOCALSTORAGE
            updateTaskText(taskId, newText)

            // 🎯 ОБНОВЛЯЕМ DOM
            if (typeof onTextUpdate === 'function') {
                onTextUpdate(taskId, newText)
            } else {
                console.error('❌ onTextUpdate не является функцией:', onTextUpdate)
            }
        } else {
            console.log('🔧 Условие НЕ прошло')
        }

        closeModal()
    })

    cancelBtn.addEventListener('click', closeModal)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal()
    })

    // Escape для закрытия
    const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleEscape)
    modal._escapeHandler = handleEscape // сохраняем для cleanup
}