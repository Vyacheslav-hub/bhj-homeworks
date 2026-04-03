document.addEventListener('DOMContentLoaded', () => {
    const signinElement = document.querySelector('#signin');
    const formSignin = document.querySelector('#signin__form');
    const welcomeElement = document.querySelector('#welcome');
    const signoutBtn = welcomeElement.querySelector('#signout__btn');

    const renderWelcome = (userId) => {
        signinElement.classList.remove('signin_active');
        welcomeElement.classList.add('welcome_active');
        welcomeElement.querySelector('#user_id').textContent = userId;
    };

    const renderSignin = () => {
        welcomeElement.classList.remove('welcome_active');
        signinElement.classList.add('signin_active');
        welcomeElement.querySelector('#user_id').textContent = '';
    };

    const setCookie = (name, value, second) => {
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${second}; path=/`;
    }

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [key, value] = cookie.split('=');

            if (key === encodeURIComponent(name)) {
                return decodeURIComponent(value);
            }
        }

        return null;
    }

    const deleteCookie = (name) => {
        document.cookie = `${name}=; max-age=0; path=/`;
    }

    const sendAuth= async () => {
        try {
            const formData = new FormData(formSignin);

            const response = await fetch(
                'https://students.netoservices.ru/nestjs-backend/auth',
                {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

            const json = await response.json();

            handleResponse(json);
        }catch (e) {
            console.error(`Ошибка отправки запроса: ${e}`)
        }
    }

    const handleResponse = (response) => {
        if (response.success) {
            setCookie('user_id', response.user_id, 3600)
            renderWelcome(response.user_id)
            formSignin.reset();

        } else {
            alert(`Неверный логин/пароль`)
            formSignin.reset();
        }
    }

    formSignin.addEventListener('submit', (e) => {
        e.preventDefault();
        sendAuth();
    })

    signoutBtn.addEventListener('click', () => {
        deleteCookie('user_id');
        renderSignin();
    })

    const savedUserId = getCookie('user_id');

    if (savedUserId) {
        renderWelcome(savedUserId)
    }
});
