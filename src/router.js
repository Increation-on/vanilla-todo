import { getTasks } from "./storage.js";
import { renderTask } from "./dom-manager.js";
import { taskList } from "./dom-elements.js";
import { bindTaskEvents } from "./task-controller.js"; // 🎯 ИМПОРТИРУЕМ

const showFilteredTasks = (filterType) => {
    const tasks = getTasks();
    
    const filtered = tasks.filter(task => {
        if (filterType === 'active') return !task.completed;
        if (filterType === 'completed') return task.completed;
        return true;
    });
    
    // 🎯 Очищаем и перерисовываем С ПРИВЯЗКОЙ СОБЫТИЙ
    taskList.innerHTML = '';
    filtered.forEach(task => {
        const elements = renderTask(task);
        bindTaskEvents(elements.taskContainer, elements.taskText, elements.checkbox, elements.deleteButton, task.id); // 🎯 ПРИВЯЗЫВАЕМ
    });
}

const handleRouteChange = () => {
    const path = window.location.pathname

    switch (path) {
        case '/':
            showFilteredTasks('all')
            break
        case '/active':
            showFilteredTasks('active')
            break
        case '/completed':
            showFilteredTasks('completed')
            break
        case '':
            showFilteredTasks('all')
            break
        default:
            return
    }
}

export const initRouter = () => {
    console.log('Роутер инициализирован')

    window.addEventListener('popstate', handleRouteChange);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault()
            const newPath = e.target.getAttribute('href');
            history.pushState(null, '', newPath);
            handleRouteChange()
        }
    })

    handleRouteChange()
}