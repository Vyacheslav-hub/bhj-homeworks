document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            // Добавляем класс, если элемент в зоне видимости
            if (elementPosition < viewportHeight) {
                element.classList.add('reveal_active');
            } else {
                element.classList.remove('reveal_active');
            }
        });
    }

    // Запускаем функцию при прокрутке и при загрузке страницы
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});