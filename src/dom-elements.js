/**
 * МОДУЛЬ: DOM ЭЛЕМЕНТЫ
 * Ответственность: централизованное управление ссылками на DOM элементы
 */

// === ОСНОВНЫЕ ПЕРЕМЕННЫЕ ===
// 🎯 ПАТТЕРН: Single Source of Truth для DOM ссылок
// Все querySelector'ы в одном месте - легко менять селекторы

export const taskInput = document.getElementById('taskInput') 
// 💡 КОММЕНТАРИЙ: Хорошая практика - использовать getElementById когда возможно
// Быстрее чем querySelector и явнее указывает на уникальность элемента

export const addBtn = document.getElementById('addBtn')       
// 🎯 ПАТТЕРН: Separation of Concerns
// Модуль не знает КАК используются элементы, только ГДЕ их найти

export const taskList = document.getElementById('taskList')   
// 🔧 АРХИТЕКТУРА: Контейнер для динамического контента
// Единая точка для манипуляций со списком задач

export const addApiTasksButton = document.getElementById('loadApiTasks') 
// 🌐 КОММЕНТАРИЙ: Название отражает функциональность, а не реализацию
// "loadApiTasks" лучше чем "button2" или "apiBtn"

