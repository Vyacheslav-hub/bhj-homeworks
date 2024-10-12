(() => {
    let deadCount = 0; // Количество убитых кротов
    let lostCount = 0; // Количество промахов
    const maxDead = 10; // Победа при 10 убитых кротах
    const maxLost = 5; // Проигрыш при 5 промахах
    let playing = true; // Игра в процессе
    let activeHole; // Текущая лунка с кротом

    const deadCounter = document.getElementById('dead');
    const lostCounter = document.getElementById('lost');

    var bit = false; // Произошел ли удар по какой-либо лунке

    // Функция для обновления счетчиков
    const updateCounters = () => {
        deadCounter.textContent = deadCount;
        lostCounter.textContent = lostCount;
    };

    const checkCounter = () => {
        if (deadCount === maxDead) {
            alert('Победа! Вы убили 10 кротов!');
            stop(); // Используем функцию stop из base.js
            resetCounters(); // Обнуляем счетчики после завершения игры
        }

        if (lostCount === maxLost) {
            alert('Игра окончена. Вы промахнулись 5 раз.');
            stop(); // Используем функцию stop из base.js
            resetCounters(); // Обнуляем счетчики после завершения игры
        }
    }

    // Обработчик кликов на лунки
    const holes = document.querySelectorAll('.hole');
    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            bit = true;
            if (!playing) return; // Проверка, что игра еще идет
            
            if (hole.classList.contains('hole_has-mole')) {
                // Убили крота
                deadCount++;
                hole.classList.remove('hole_has-mole'); // Убираем крота
            } else {
                // Промах
                if ([...holes].filter(item => item.classList.contains('hole_has-mole')).length) {
                    lostCount++;
                }
                holes.forEach(item => item.classList.remove('hole_has-mole'));
            }
            
            updateCounters(); // Обновляем счетчики

            // Проверка на победу или поражение
            checkCounter();
        });
    });

    // Проверяем, если крот не был убит
    const checkMoleMissed = () => {
        if (activeHole !== undefined && !getHole(activeHole).classList.contains('hole_has-mole')) {
            lostCount++;
            updateCounters();
        }
        checkCounter();
    };

    // Функция для сброса счетчиков
    const resetCounters = () => {
        deadCount = 0;
        lostCount = 0;
        updateCounters(); // Обновляем счетчики после обнуления
    };

    // Запуск проверки, чтобы учитывать промахи
    setInterval(() => {
        if (!bit) {
            lostCount++;
            updateCounters();
        }
        bit = false;
        checkMoleMissed();
    }, 800);
})();