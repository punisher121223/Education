// تابع ثبت‌نام
function register() {
    try {
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value.trim();

        // بررسی اینکه فیلدها خالی نباشن
        if (!username || !password) {
            alert('لطفاً همه‌ی فیلدها را پر کنید!');
            return;
        }

        // دریافت لیست کاربران از localStorage یا یه آرایه خالی
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // بررسی اینکه نام کاربری قبلاً ثبت نشده باشه
        if (users.some(user => user.username === username)) {
            alert('این نام کاربری قبلاً ثبت شده است!');
            return;
        }

        // اضافه کردن کاربر جدید به لیست
        users.push({ username, password, practices: 0, package: null });
        localStorage.setItem('users', JSON.stringify(users));

        // نمایش پیام موفقیت و انتقال به صفحه ورود
        alert('ثبت‌نام با موفقیت انجام شد! حالا می‌تونی وارد شی 😊');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('خطا در ثبت‌نام:', error);
        alert('یه مشکلی پیش اومد! لطفاً دوباره امتحان کن.');
    }
}

// تابع ورود
function login() {
    try {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // بررسی اینکه فیلدها خالی نباشن
        if (!username || !password) {
            alert('لطفاً همه‌ی فیلدها را پر کنید!');
            return;
        }

        // دریافت لیست کاربران
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // ذخیره نام کاربری فعلی برای استفاده در صفحات دیگه
            localStorage.setItem('currentUser', username);
            alert('خوش اومدی، ' + username + '! 🎈');
            window.location.href = 'dashboard.html';
        } else {
            alert('نام کاربری یا رمز عبور اشتباهه!');
        }
    } catch (error) {
        console.error('خطا در ورود:', error);
        alert('یه مشکلی پیش اومد! لطفاً دوباره امتحان کن.');
    }
}
