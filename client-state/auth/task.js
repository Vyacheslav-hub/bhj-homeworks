document.addEventListener('DOMContentLoaded', () =>{
    const signin = document.querySelector('#signin');
    const signinForm = document.querySelector('#signin__form');
    const welcome = document.querySelector('#welcome');
    const usersId = document.querySelector('#user_id');
    const logoutBtn = document.querySelector('#logout__btn');

    // Проверяем, есть ли сохранённый ID пользователя в localStorage
    const storedUserId = localStorage.getItem('user_id');
        if(storedUserId) {
            displayWelcome(storedUserId);
        }

    // Обработчик отправки формы
    signinForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(signinForm); // Создаём объект FormData из формы
        const login = formData.get('login'); // Получаем логин
        const password = formData.get('password'); // Получаем пароль

            // Отправляем AJAX-запрос с данными формы
            fetch(signinForm.action, {
                method: 'POST',
                body: JSON.stringify({login, password}), // Отправляем данные в формате JSON
                headers: {                               // Указываем заголовок, чтобы сервер знал, что это JSON
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json()) // Получаем ответ от сервера и парсим его как JSON
                .then(data => { // Обрабатываем данные от сервера
                    if(data.success) {
                        localStorage.setItem('user_id', data.user_id);
                        displayWelcome(data.user_id);
                        signinForm.reset();
                    }else {
                        alert('Неверный логин/пароль');
                        signinForm.reset();
                    }
                })
                .catch(error => { // Если возникла ошибка при отправке запроса или обработке данных
                    console.error(`Ошибка: ${error}`);
                    alert(`Произошла ошибка при авторизации.`);
                    signinForm.reset();
                })
        })

    // Обработчик нажатия кнопки "Выйти"
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user_id');
        welcome.classList.remove('welcome_active');
        signin.classList.add('signin_active');
    })

    // Функция для отображения приветствия после успешной авторизации
    function displayWelcome(userId) {
        signin.classList.remove('signin_active');
        welcome.classList.add('welcome_active');
        usersId.textContent = userId;
    }
})