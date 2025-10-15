import { loadTasksFromLocalStorage, renderTasks } from "./storage.js";

const showFilteredTasks = (filterType) => {
    const tasks = loadTasksFromLocalStorage();
    const filtered = tasks.filter(task => {
        if (filterType === 'active') return !task.completed;
        if (filterType === 'completed') return task.completed;
        return true;
    });
    
    // ВРЕМЕННОЕ РЕШЕНИЕ: сохраняем полный список ПЕРЕД рендером
    localStorage.setItem('all_tasks_backup', JSON.stringify(tasks));
    
    renderTasks(filtered);
    
    // Восстанавливаем полный список после небольшой задержки

    setTimeout(() => {
        const fullTasks = JSON.parse(localStorage.getItem('all_tasks_backup') || '[]');
        localStorage.setItem('tasks', JSON.stringify(fullTasks));
    }, 100);
    //Но это костыль! Нужно переделать saveTasksToLocalStorage чтобы она не зависела от DOM! 🏗️
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
            history.pushState(null, '', newPath); // Меняем URL
            handleRouteChange()
        }
    })

    handleRouteChange()
}

