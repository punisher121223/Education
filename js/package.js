function buyPackage(packageName, description, price) {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser === 'guest') {
        alert('لطفاً ابتدا یک حساب کاربری بسازید!');
        window.location.href = 'profile.html';
        return;
    }
    let message = `سلام، من می‌خوام بسته "${packageName}" با توضیحات "${description}" و قیمت ${price} تومان رو خریداری کنم.`;
    let telegramLink = `https://t.me/alireza_teacher?text=${encodeURIComponent(message)}`;
    window.open(telegramLink, '_blank');
}
