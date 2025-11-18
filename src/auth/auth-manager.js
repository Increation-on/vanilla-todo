// auth-manager.js
export const AuthManager = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    
    register(email, password) {
        // Проверяем, нет ли уже такого пользователя
        const existingUser = this.users.find(user => user.email === email);
        if (existingUser) {
            return false; // email уже занят
        }
        
        // Регистрируем нового пользователя
        const newUser = { email, password };
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        console.log('📝 Новый пользователь:', email);
        return true;
    },

    login(email, password) {
        // Ищем пользователя в зарегистрированных
        const user = this.users.find(user => 
            user.email === email && user.password === password
        );
        
        if (user) {
            // Сохраняем текущую сессию
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
    },

    isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
}