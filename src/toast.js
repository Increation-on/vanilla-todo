// toast.js
export const showToast = (message, type = 'info') => {
    // Создаем элемент toast
    const toast = document.createElement('div')
    toast.textContent = message
    toast.className = `toast toast-${type}`
    
    // Добавляем стили
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '4px',
        color: 'white',
        zIndex: '1000',
        transition: 'opacity 0.3s'
    })
    
    // Цвета в зависимости от типа
    const colors = {
        error: '#f44336',
        success: '#4caf50', 
        info: '#2196f3'
    }
    toast.style.backgroundColor = colors[type] || colors.info
    
    // Добавляем в DOM
    document.body.appendChild(toast)
    
    // Удаляем через 4 секунды
    setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast)
            }
        }, 300)
    }, 2000)
}