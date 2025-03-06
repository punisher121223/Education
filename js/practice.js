function startPractice(subject) {
    currentSubject = subject;
    let currentUser = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.username === currentUser);

    if (user.practices >= 15 && !user.package) {
        alert('تمرین رایگان شما به پایان رسید، برای خرید بسته کلیک کنید');
        window.location.href = 'packages.html';
        return;
    }

    practiceCount = user.practices;
    window.location.href = 'practice.html';
}
