document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    const progressElement = document.querySelector('#progress');
    let timer;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                progressElement.value = e.loaded / e.total;
            }
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                progressElement.value = 100
                console.log('Файл отправлен');
                form.reset();
                clearTimeout(timer);
                timer = setTimeout(() => progressElement.value = 0, 2000);
            }else {
                console.error(`Ошибка отправки файла: ${xhr.status}`);
            }
        }

        xhr.onerror = () => {
            console.error('Ошибка отправки файла');
        }

        xhr.send(formData);
    })
})
