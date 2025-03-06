function adminLogin() {
    let username = document.getElementById('admin-username').value;
    let password = document.getElementById('admin-password').value;

    if (username === 'alireza' && password === '12122312') {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadUsers();
    } else {
        alert('نام کاربری یا رمز عبور اشتباه است!');
    }
}

function loadUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        let userDiv = document.createElement('div');
        userDiv.innerHTML = `کاربر: ${user.username} - بسته: ${user.package || 'هیچ بسته‌ای'} 
            <button onclick="activatePackage('${user.username}')">فعال‌سازی بسته</button>`;
        userList.appendChild(userDiv);
    });
}

function activatePackage(username) {
    let packageName = prompt('نام بسته را وارد کنید (دانش‌آموز، دانشجوی آینده، دانشمند آینده):');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.username === username);

    if (user) {
        user.package = packageName;
        localStorage.setItem('users', JSON.stringify(users));
        alert(`بسته ${packageName} برای کاربر ${username} فعال شد!`);
        loadUsers();
    }
}
