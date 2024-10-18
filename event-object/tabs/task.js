document.addEventListener('DOMContentLoaded', () => {
    // Получаем все элементы вкладок и содержимого
    const tabsElements = document.querySelectorAll('.tab');
    const contentsElements = document.querySelectorAll('.tab__content');

    // Функция для переключения вкладок
    function switchTab(index) {
        // Убираем активный класс у всех содержимых
        contentsElements.forEach(content => content.classList.remove('tab__content_active'));
        // Убираем активный класс у всех вкладок
        tabsElements.forEach(tab => tab.classList.remove('tab_active'));

        // Добавляем активный класс к текущему содержимому и вкладке
        contentsElements[index].classList.add('tab__content_active');
        tabsElements[index].classList.add('tab_active');
    }

    // Добавляем обработчики событий для каждой вкладки
    tabsElements.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            switchTab(index);
        });
    });
});