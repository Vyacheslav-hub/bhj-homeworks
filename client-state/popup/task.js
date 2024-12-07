document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('subscribe-modal');
    const closeModal = modal.querySelector('.modal__close');

    // Функция для установки cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;`;
    }

    // Функция для получения значения cookie
    function getCookie(name) {
        const cookies = document.cookie.split('; '); // Разбиваем cookie на пары "ключ=значение"
        const foundCookie = cookies.find(cookie => cookie.startsWith(`${name}=`)) //находим нужный элемент
        return foundCookie ? foundCookie.split('=')[1] : null; // Делаем условие и к подходящему имени добавляем значение
    }

    // Функция для удаления cookie
    //  function deleteCookie(name) {
    //     const pastDate = new Date(0);  // Получаем прошлую дату через 0;
    //     document.cookie = `${name}=;expires=${pastDate.toUTCString()};path=/`;
    // }

    // Проверяем, есть ли в cookie информация о закрытии окна
    if (!getCookie('closedModal')) {
        modal.classList.add('modal_active');
    }

    // Обработчик закрытия окна
    closeModal.addEventListener('click', () => {
        modal.classList.remove('modal_active');
        setCookie('closedModal', 'true', 365); // Устанавливаем cookie на 1 год
    });


    // deleteCookie('closedModal');
});
