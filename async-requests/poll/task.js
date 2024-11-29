document.addEventListener('DOMContentLoaded', () => {
    const pollUrl = 'https://students.netoservices.ru/nestjs-backend/poll'; // URL для запросов

    const pollTitleElement = document.getElementById('poll__title');
    const pollAnswersElement = document.getElementById('poll__answers');

// Функция загрузки данных опроса
    async function loadPoll() {
        try {
            const response = await fetch(pollUrl); // Отправляем GET-запрос для получения данных
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`); // Если ответ неудачный, выбрасываем ошибку
            }

            const pollData = await response.json(); // Парсим ответ как JSON
            renderPoll(pollData); // Передаем данные для отображения опроса
        } catch (error) {
            console.error('Ошибка загрузки данных опроса:', error); // Логируем ошибки
        }
    }

// Функция отображения опроса
    function renderPoll(data) {
        pollTitleElement.textContent = data.data.title; // Устанавливаем заголовок опроса
        pollAnswersElement.innerHTML = ''; // Очищаем контейнер с ответами

        data.data.answers.forEach((answer, index) => {
            const button = document.createElement('button'); // Создаем кнопку для каждого ответа
            button.className = 'poll__answer'; // Добавляем CSS-класс
            button.textContent = answer; // Устанавливаем текст кнопки

            // Добавляем обработчик клика для голосования
            button.addEventListener('click', () => {
                handleVote(data.id, index); // Передаем ID опроса и индекс ответа
            });

            pollAnswersElement.appendChild(button); // Добавляем кнопку в контейнер
        });
    }

// Функция обработки голосования
    async function handleVote(pollId, answerIndex) {
        alert('Спасибо, ваш голос засчитан!'); // Показываем сообщение пользователю

        try {
            const params = new URLSearchParams({
                vote: pollId, // ID опроса
                answer: answerIndex, // Индекс выбранного ответа
            });

            const response = await fetch(pollUrl, {
                method: 'POST', // Метод POST для отправки данных
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Указываем заголовок
                },
                body: params.toString(), // Преобразуем параметры в строку
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`); // Обрабатываем ошибки сервера
            }

            const resultData = await response.json(); // Получаем статистику голосования
            renderResults(resultData.stat); // Отображаем результаты
        } catch (error) {
            console.error('Ошибка при отправке голосования:', error); // Логируем ошибки
        }
    }

// Функция отображения результатов голосования
    function renderResults(stat) {
        pollAnswersElement.innerHTML = ''; // Очищаем контейнер

        const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0); // Считаем общее количество голосов

        stat.forEach((item) => {
            const percentage = ((item.votes / totalVotes) * 100).toFixed(2); // Вычисляем процент голосов
            const resultElement = document.createElement('div'); // Создаем элемент для результата
            resultElement.innerHTML = `${item.answer}: <b>${percentage}%</b>`; // Форматируем результат
            pollAnswersElement.appendChild(resultElement); // Добавляем элемент в контейнер
        });
    }

// Инициализация приложения
    loadPoll(); // Загружаем опрос при запуске страницы
})