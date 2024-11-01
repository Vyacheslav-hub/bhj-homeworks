document.addEventListener("DOMContentLoaded", function () {
    const book = document.getElementById("book");
    const fontSizeControls = document.querySelectorAll(".font-size");
    const textColorControls = document.querySelectorAll(".book__control_color .color");
    const bgColorControls = document.querySelectorAll(".book__control_background .color");

    fontSizeControls.forEach(control => {
        control.addEventListener("click", (event) => {
            event.preventDefault();

            // Удаляем класс font-size_active у всех кнопок
            fontSizeControls.forEach(btn => btn.classList.remove("font-size_active"));

            // Добавляем класс font-size_active к текущей кнопке
            control.classList.add("font-size_active");

            // Сбрасываем классы размера шрифта
            book.classList.remove("book_fs-small", "book_fs-big");

            // Применяем класс в зависимости от атрибута data-size
            const fontSize = control.getAttribute("data-size");
            if (fontSize === "small") {
                book.classList.add("book_fs-small");
            } else if (fontSize === "big") {
                book.classList.add("book_fs-big");
            }
        });
    });

    // Управление цветом текста
    textColorControls.forEach(control => {
        control.addEventListener('click', (event) => {
            event.preventDefault();

            textColorControls.forEach(btn => btn.classList.remove('color_active'));
            control.classList.add('color_active');

            book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

            const textColor = control.getAttribute('data-text-color');
            if (textColor) {
                book.classList.add(`book_color-${textColor}`);
            }
        });
    });

    // Управление цветом фона
    bgColorControls.forEach(control => {
        control.addEventListener('click', (event) => {
            event.preventDefault();

            bgColorControls.forEach(btn => btn.classList.remove('color_active'));
            control.classList.add('color_active');

            book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');

            const bgColor = control.getAttribute('data-bg-color');
            if (bgColor) {
                book.classList.add(`book_bg-${bgColor}`);
            }
        });
    });
});