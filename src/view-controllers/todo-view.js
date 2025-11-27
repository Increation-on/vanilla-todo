const SELECTORS = {
    CONTAINER: '.container'
}

export const TodoViewController = {
    /**
     * Показывает основной интерфейс с задачами
     */
    showTodoApp() {
        console.log('📋 Showing todo app')
        const container = document.querySelector(SELECTORS.CONTAINER)
        if (container) {
            container.style.display = 'block'
        }
    },

    /**
     * Скрывает основной интерфейс с задачами
     */
    hideTodoApp() {
        const container = document.querySelector(SELECTORS.CONTAINER)
        if (container) {
            container.style.display = 'none'
        }
    }
}