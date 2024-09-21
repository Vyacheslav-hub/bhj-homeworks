let clicker__counter = 0; // Счётчик кликов
let isLarge = false; // Флаг для отслеживания текущего размера печеньки
let startTime = null; // Время первого клика

function handleCookieClick() {
    // Увеличиваем значение счётчика
    clicker__counter++;
    document.getElementById('clicker__counter').textContent = clicker__counter;

    // Если это первый клик, запоминаем время старта
    if (!startTime) {
        startTime = Date.now();
    }

    // Вычисляем прошедшее время в секундах
    const elapsedTime = (Date.now() - startTime) / 1000; // Время в секундах

    // Вычисляем скорость клика (клики / время)
    const clickSpeed = (clicker__counter / elapsedTime).toFixed(2); // Округляем до 2 знаков
    document.getElementById('clickSpeed').textContent = clickSpeed;

    // Получаем элемент печеньки
    const elementCookie = document.getElementById('cookie');

    // Чередуем размер печеньки
    if (isLarge) {
        elementCookie.style.width = '200px';
    } else {
        elementCookie.style.width = '250px';
    }

    // Меняем флаг для чередования
    isLarge = !isLarge;
}