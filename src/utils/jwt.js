/**
 * 🎫 MOCK JWT ГЕНЕРАТОР И ПАРСЕР
 * 
 * ВАЖНО: Это учебная реализация, не используй в продакшене!
 * Настоящие JWT используют криптографическую подпись
 */

export const createMockJWT = (payload) => {
  // Просто кодируем payload в base64 (это MOCK, не настоящий JWT!)
  const encodedPayload = btoa(JSON.stringify(payload))
  return `mock-jwt.${encodedPayload}.fake-signature`
}

export const parseMockJWT = (token) => {
  try {
    // 🧩 РАЗБИРАЕМ ТОКЕН НА ЧАСТИ
    const parts = token.split('.')
    
    // 📦 ДЕКОДИРУЕМ PAYLOAD ИЗ BASE64
    const payload = JSON.parse(atob(parts[1]))
    
    return payload
  } catch {
    // ❌ ЕСЛИ ТОКЕН ПОВРЕЖДЕН - ВОЗВРАЩАЕМ NULL
    return null
  }
}