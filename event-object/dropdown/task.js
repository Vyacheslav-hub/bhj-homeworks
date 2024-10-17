document.addEventListener('DOMContentLoaded', () => {
    const dropdownValue = document.querySelector('.dropdown__value');
    const dropdownList = document.querySelector('.dropdown__list');

    // Открытие и закрытие выпадающего списка при клике на кнопку
    dropdownValue.addEventListener('click', () => {
        dropdownList.classList.toggle('dropdown__list_active');
    });

    // Обработка кликов по элементам списка
    const dropdownItems = document.querySelectorAll('.dropdown__link');

    dropdownItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            dropdownValue.textContent = item.textContent;
            dropdownList.classList.remove('dropdown__list_active');
        });
    });
});