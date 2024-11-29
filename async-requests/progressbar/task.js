document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const progress = document.querySelector('#progress');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

        xhr.upload.addEventListener('progress', (event) => {
            if(event.lengthComputable) {
                const progressValue = event.loaded / event.total;
                progress.value = progressValue;
            }
        });

        xhr.addEventListener('load', () => {
            if(xhr.status >= 200 && xhr.status < 300) {
                console.log(`Ответ сервера: ${xhr.responseText}`);
                alert(`Файл успешно загружен`);
            }else {
                console.log(`Ошибка: ${xhr.status} ${xhr.statusText}`);
                alert(`Ошибка: ${xhr.status} ${xhr.statusText}`);
            }
        });

        xhr.addEventListener('error', () => {
            alert(`Ошибка соединения с сервером.`);
        });

        xhr.send(formData);
    })
})