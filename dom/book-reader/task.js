document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');

    function fsText() {
        book.querySelector('.book__control_font-size').addEventListener('click', e => {
            e.preventDefault();

            const fontButton = e.target.closest('.font-size');

            if (!fontButton) return;


            book.querySelectorAll('.font-size').forEach(item => item.classList.remove('font-size_active'))

            book.classList.remove('book_fs-small', 'book_fs-big');

            fontButton.classList.add('font-size_active');

            let fs = fontButton.dataset.size;

            if (fs) {
                book.classList.add(`book_fs-${fs}`)
            }
        });
    }

    function colorText() {
        book.querySelector('.book__control_color').addEventListener('click', e => {
            e.preventDefault();

            const colorButton = e.target.closest('.color');

            if (!colorButton) return;

            book.querySelectorAll('.book__control_color .color').forEach(item => item.classList.remove('color_active'));

           ['black', 'gray', 'whitesmoke'].forEach(color => book.classList.remove(`book_color-${color}`));

            colorButton.classList.add('color_active');

            let color = colorButton.dataset.textColor;

            if (color) book.classList.add(`book_color-${color}`);
        })
    }

    function bgText() {
        book.querySelector('.book__control_background').addEventListener('click', e => {
            e.preventDefault();

            const bgButton = e.target.closest('.color');

            if (!bgButton) return;

            book.querySelectorAll('.book__control_background .color').forEach(item => item.classList.remove('color_active'));

            ['black', 'gray', 'white'].forEach(bg => book.classList.remove(`book_bg-${bg}`));

            bgButton.classList.add('color_active');

            let bg = bgButton.dataset.bgColor;

            if (bg) book.classList.add(`book_bg-${bg}`);
        })
    }
    fsText();
    colorText();
    bgText()
})
