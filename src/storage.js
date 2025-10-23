// storage.js

// 🎯 ШАГ 1.1: СОСТОЯНИЕ В ПАМЯТИ
let tasks = []; // Это наш ЕДИНЫЙ ИСТОЧНИК ИСТИНЫ

// 🎯 ШАГ 1.2: ЗАГРУЗКА ИЗ LOCALSTORAGE ПРИ ЗАПУСКЕ
const loadFromStorage = () => {
    try {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            tasks = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        tasks = []; // На случай ошибки - пустой массив
    }
};

// 🎯 ШАГ 1.3: ВЫЗЫВАЕМ ПРИ ИМПОРТЕ МОДУЛЯ
loadFromStorage();


// 🎯 ШАГ 2.1: ФУНКЦИЯ ДЛЯ СОХРАНЕНИЯ В LOCALSTORAGE
const saveToStorage = () => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
    }
};

// 🎯 ШАГ 2.2: ПОЛУЧЕНИЕ ЗАДАЧ (READ-ONLY)
export const getTasks = () => {
    return [...tasks]; // 🎯 Возвращаем КОПИЮ, а не оригинал
};

// 🎯 ШАГ 2.3: ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ
// storage.js
export const addTask = (taskData) => {
    const newTask = typeof taskData === 'string' 
        ? {
            id: Date.now().toString(),
            text: taskData.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            source: 'user' // 🎯 ДОБАВЛЯЕМ ИСТОЧНИК
        }
        : {
            ...taskData,
            id: taskData.id || Date.now().toString(),
            createdAt: taskData.createdAt || new Date().toISOString(),
            source: taskData.source || 'api' // 🎯 ДОБАВЛЯЕМ ИСТОЧНИК
        };
    
    tasks = [...tasks, newTask];
    saveToStorage();
    return newTask;
};


// 🎯 ШАГ 3.1: УДАЛЕНИЕ ЗАДАЧИ ПО ID
export const removeTask= (id) => {
    // 🎯 ФИЛЬТРУЕМ МАССИВ - оставляем все задачи КРОМЕ удаляемой
    tasks = tasks.filter(task => task.id !== id);
    saveToStorage(); // 🎯 Автосохранение
};


// 🎯 ШАГ 4.1: ПЕРЕКЛЮЧЕНИЕ СТАТУСА completed
export const toggleTask = (id) => {
    // 🎯 MAP создает новый массив, изменяя только нужный элемент
    tasks = tasks.map(task => {
        if (task.id === id) {
            // 🎯 Возвращаем ОБНОВЛЕННУЮ задачу
            return {
                ...task, // 🎯 Копируем все свойства
                completed: !task.completed // 🎯 Инвертируем completed
            };
        }
        // 🎯 Возвращаем неизмененную задачу
        return task;
    });
    saveToStorage(); // 🎯 Автосохранение
};