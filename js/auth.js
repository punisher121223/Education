function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert('این نام کاربری قبلاً ثبت شده است!');
            return;
        }
        users.push({ username, password, practices: 0, package: null });
        localStorage.setItem('users', JSON.stringify(users));
        alert('ثبت‌نام با موفقیت انجام شد!');
        window.location.href = 'index.html';
    } else {
        alert('لطفاً همه‌ی فیلدها را پر کنید!');
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('نام کاربری یا رمز عبور اشتباه است!');
    }
}
