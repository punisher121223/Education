// بررسی کاربر فعلی یا تنظیم حالت مهمان
function initUser() {
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        localStorage.setItem('currentUser', 'guest');
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (!users.find(user => user.username === 'guest')) {
            users.push({ username: 'guest', practices: 0, package: null });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    updateUserDisplay();
}

// به‌روزرسانی نمایش نام کاربر در داشبورد
function updateUserDisplay() {
    let userDisplay = document.getElementById('user-display');
    let logoutLink = document.getElementById('logout-link');
    let currentUser = localStorage.getItem('currentUser');
    if (userDisplay) {
        userDisplay.innerText = currentUser === 'guest' ? 'مهمان' : currentUser;
    }
    if (logoutLink) {
        logoutLink.style.display = currentUser === 'guest' ? 'none' : 'inline';
    }
}

// ساخت حساب جدید از پروفایل
function createAccount() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert('این نام کاربری قبلاً ثبت شده است!');
            return;
        }
        // انتقال اطلاعات کاربر مهمان به حساب جدید
        let guestData = users.find(user => user.username === 'guest');
        users.push({ username, password, practices: guestData.practices, package: null });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', username);
        alert('حساب شما با موفقیت ساخته شد!');
        window.location.reload();
    } else {
        alert('لطفاً همه‌ی فیلدها را پر کنید!');
    }
}

// خروج از حساب
function logout() {
    localStorage.setItem('currentUser', 'guest');
    window.location.href = 'dashboard.html';
}

// اجرا هنگام بارگذاری صفحه
window.onload = function () {
    initUser();
};
