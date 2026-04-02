document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector('#editor');

    textArea.value = localStorage.getItem('text') || '';

    textArea.addEventListener('input', () => {
       setText(textArea.value);
    })

    document.querySelector('#remove').addEventListener('click', () => {
        textArea.value = '';

        setText(textArea.value)
    })

    function setText (value) {
        localStorage.setItem('text', value)
    }
})
