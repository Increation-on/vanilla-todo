// field-validators.test.js
import { validateEmail, validatePassword } from "../field-validators";

/**
 * 🧪 ТЕСТЫ ДЛЯ ВАЛИДАТОРА EMAIL
 */
describe('validateEmail', () => {

    test('должен возвращать true для валидных email', () => {
        expect(validateEmail('test@mail.com')).toBe(true)
        expect(validateEmail('user.name@domain.co.uk')).toBe(true)
        expect(validateEmail('hello@sub.domain.com')).toBe(true)
        expect(validateEmail('user123@mail.com')).toBe(true)
        expect(validateEmail('user.name+tag@domain.com')).toBe(true)
    });

    test('должен возвращать false для невалидных email', () => {
        expect(validateEmail('invalid')).toBe(false)
        expect(validateEmail('test@mail')).toBe(false)
        expect(validateEmail('@mail.com')).toBe(false)
        expect(validateEmail('test@.com')).toBe(false)
        expect(validateEmail('')).toBe(false)
    });
});

/**
 * 🧪 ТЕСТЫ ДЛЯ ВАЛИДАТОРА ПАРОЛЯ
 */
describe('validatePassword', () => {

    test('должен возвращать true для валидных паролей', () => {
        expect(validatePassword('pass123')).toBe(true)
        expect(validatePassword('password1')).toBe(true)
        expect(validatePassword('123abc')).toBe(true)
        expect(validatePassword('Pass123')).toBe(true)
    });

    test('должен возвращать false для невалидных паролей', () => {
        expect(validatePassword('12345')).toBe(false)     // слишком короткий
        expect(validatePassword('password')).toBe(false)  // нет цифр
        expect(validatePassword('123456')).toBe(false)    // только цифры
        expect(validatePassword('')).toBe(false)         // пустой
    });
});