document.addEventListener("DOMContentLoaded", function () {
    const rotatorCases = document.querySelectorAll('.rotator__case');
    let activeIndex = 0;
    let rotationTimeout;

    function rotateText() {
        // Сбрасываем активный класс у текущего элемента
        rotatorCases[activeIndex].classList.remove('rotator__case_active');

        // Переходим к следующему элементу
        activeIndex++;

        // Если достигли конца списка, сбрасываем индекс на 0
        if (activeIndex >= rotatorCases.length) {
            activeIndex = 0;
        }

        const nextCase = rotatorCases[activeIndex];

        // Добавляем активный класс новому элементу
        nextCase.classList.add('rotator__case_active');

        // Устанавливаем цвет текста и время смены из атрибутов data-color и data-speed
        nextCase.style.color = nextCase.getAttribute('data-color');
        const speed = nextCase.getAttribute('data-speed') || 1000;

        // Сбрасываем текущий таймер, чтобы не создавать накопление
        clearTimeout(rotationTimeout);

        // Устанавливаем новый таймер для смены элемента
        rotationTimeout = setTimeout(rotateText, speed);
    }

    // Запускаем ротатор
    rotateText();
});