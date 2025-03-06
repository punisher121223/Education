function buyPackage(packageName, description, price) {
    let message = `سلام، من می‌خوام بسته "${packageName}" با توضیحات "${description}" و قیمت ${price} تومان رو خریداری کنم.`;
    let telegramLink = `https://t.me/alireza_teacher?text=${encodeURIComponent(message)}`;
    window.open(telegramLink, '_blank');
}
