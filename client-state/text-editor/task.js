document.addEventListener('DOMContentLoaded', () => {
    const editor = document.querySelector('#editor');
    const clearButton = document.querySelector('#clear-button');

    // Загрузка текста из локального хранилища
    const saveText = localStorage.getItem('textEditor');
        if (saveText) {
            editor.value = saveText;
        }

        // Сохранение текста в локальное хранилище при вводе
        editor.addEventListener('input', () => {
            localStorage.setItem('textEditor', editor.value);
        })

        // Очистка содержимого текстового редактора
        clearButton.addEventListener('click', () => {
            editor.value = '';
            localStorage.removeItem('textEditor');
        })
})