document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('subscribe-modal');
    const modalClose = document.querySelector('.modal__close');

    modalClose.addEventListener('click', () => {
        modal.classList.remove('modal_active');
        setCookie('modal_closed', 'true', 63072000);
    });

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

    if (!getCookie('modal_closed')) {
        modal.classList.add('modal_active');
    }
});
