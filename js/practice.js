let currentSubject = '';
let practiceCount = 0;
let questions = {
    math: [
        { question: '۲ + ۳ = ?', options: ['۵', '۴', '۶', '۳'], correct: '۵' },
        { question: '۵ - ۲ = ?', options: ['۲', '۳', '۴', '۱'], correct: '۳' },
        // اضافه کردن تمرین‌های بیشتر بر اساس کتاب ریاضی
    ],
    writing: [
        { question: 'حرف "ا" در کلمه "ابر" کجاست؟', options: ['اول', 'وسط', 'آخر'], correct: 'اول' },
        { question: 'کلمه "بابا" چند حرف دارد؟', options: ['۳', '۴', '۵'], correct: '۴' },
        // اضافه کردن تمرین‌های بیشتر بر اساس کتاب‌های فارسی و نگارش
    ]
};

function startPractice(subject) {
    currentSubject = subject;
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(u => u.username === user);

    if (currentUser.practices >= 15 && !currentUser.package) {
        alert('تمرین رایگان شما به پایان رسید، برای خرید بسته کلیک کنید');
        window.location.href = 'packages.html';
        return;
    }

    practiceCount = currentUser.practices;
    window.location.href = 'practice.html';
}

window.onload = () => {
    if (window.location.pathname.includes('practice.html')) {
        document.getElementById('subject-name').innerText = currentSubject === 'math' ? 'ریاضی' : 'فارسی و نگارش';
        document.getElementById('practice-count').innerText = practiceCount;
        loadQuestion();
    } else if (window.location.pathname.includes('dashboard.html')) {
        let user = localStorage.getItem('currentUser');
        document.getElementById('user-display').innerText = user;
    }
};

function loadQuestion() {
    let questionSet = questions[currentSubject];
    let randomQuestion strap = Math.floor(Math.random() * questionSet.length);
    let selectedQuestion = questionSet[random];
    document.getElementById('question').innerText = selectedQuestion.question;

    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    let shuffledOptions = selectedQuestion.options.sort(() => Math.random() - 0.5);
    shuffledOptions.forEach(option => {
        let button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option, selectedQuestion.correct);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        practiceCount++;
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(u => u.username === localStorage.getItem('currentUser'));
        user.practices = practiceCount;
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('practice-count').innerText = practiceCount;

        if (practiceCount >= 15 && !user.package) {
            alert('تمرین رایگان شما به پایان رسید، برای خرید بسته کلیک کنید');
            window.location.href = 'packages.html';
        } else {
            loadQuestion();
        }
    } else {
        alert('اشتباه بود! دوباره امتحان کن');
    }
}

function nextPractice() {
    loadQuestion();
}
