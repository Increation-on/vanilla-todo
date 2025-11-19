/**
 * УТИЛИТЫ ЭКРАНИРОВАНИЯ
 * Защита от XSS и поломки HTML/RegExp
 */

/**
 * Экранирование HTML-символов
 * Преобразует < > & " ' в HTML-сущности
 */
export const escapeHtml = (text) => {
    if (typeof text !== 'string') return text
    
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

/**
 * Экранирование для регулярных выражений
 * Экранирует . * + ? ^ $ { } ( ) | [ ] \ /
 */
export const escapeRegex = (text) => {
    if (typeof text !== 'string') return text
    
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Экранирование для HTML-атрибутов
 * Особенно для value="..." и data-атрибутов
 */
export const escapeAttr = (text) => {
    if (typeof text !== 'string') return text
    
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
}