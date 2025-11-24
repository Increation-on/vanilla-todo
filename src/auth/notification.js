/**
 * 🎪 СИСТЕМА УВЕДОМЛЕНИЙ
 * Показывает красивые toast-сообщения в стиле приложения
 */

export const showNotification = (message, type = 'success') => {
    // Создаем элемент уведомления
    const toast = document.createElement('div')
    toast.className = `auth-toast toast-${type}`
    toast.textContent = message
    
    // Добавляем в тело документа
    document.body.appendChild(toast)
    
    // Автоматически удаляем после анимации
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast)
        }
    }, 2000)
}

// 🎯 УДОБНЫЕ ФУНКЦИИ-ОБЕРТКИ
export const showSuccessNotification = (message) => {
    showNotification(message, 'success')
}

export const showErrorNotification = (message) => {
    showNotification(message, 'error')
}