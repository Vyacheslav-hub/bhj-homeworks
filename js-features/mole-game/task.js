(() => {
    let score = 0;
    let misses = 0;
    const totalMoles = 10;  // Количество необходимых убитых кротов для победы
    const totalMisses = 5;   // Максимальное количество промахов до проигрыша
    let activeHole = null;   // Хранит текущую активную лунку с кротом
    let playing = true;      // Статус игры
    let moleTimeout;         // Переменная для хранения таймера появления кротов

    const getHole = (index) => document.getElementById(`hole${index}`);
    const updateStatus = () => {
        document.getElementById('dead').innerText = score;
        document.getElementById('lost').innerText = misses;
    };

    const activateHole = (index) => {
        getHole(index).classList.add('hole_has-mole');
        activeHole = index;  // Устанавливаем активную лунку
    };

    const deactivateHole = (index) => {
        getHole(index).classList.remove('hole_has-mole');
        activeHole = null;  // Убираем активную лунку после деактивации
    };

    const randomHole = () => {
        let hole;
        do {
            hole = Math.floor(Math.random() * 9) + 1;
        } while (hole === activeHole);  // Гарантируем, что крот не появится в той же лунке
        return hole;
    };

    const nextMole = () => {
        if (!playing) return;  // Останавливаем появление новых кротов, если игра завершена

        if (activeHole !== null) {
            deactivateHole(activeHole);  // Убираем текущего крота перед появлением следующего
        }

        const newHole = randomHole();
        activateHole(newHole);

        moleTimeout = setTimeout(() => {
            if (playing && activeHole === newHole) {  // Проверяем, активен ли еще крот
                misses++;  // Если крот не был кликнут, увеличиваем промахи
                updateStatus();
                checkGameOver();
                deactivateHole(newHole);  // Деактивируем крота, если по нему не кликнули
            }
            nextMole();  // Переход к следующему кроту, если игра продолжается
        }, 1500);  // Время, через которое крот исчезает, если по нему не кликнули
    };

    const checkGameOver = () => {
        if (misses >= totalMisses) {
            playing = false;  // Останавливаем игру при поражении
            clearTimeout(moleTimeout);  // Останавливаем таймер появления кротов
            alert('Игра окончена! Вы набрали ' + score + ' очков.');
        }
    };

    const handleClick = (index) => {
        if (!playing || activeHole !== index) return;  // Игнорируем клик, если игра окончена или лунка неактивна

        score++;  // Увеличиваем счет за успешный клик по кроту
        updateStatus();
        deactivateHole(index);  // Убираем крота моментально при успешном клике
        checkVictory();
    };

    const checkVictory = () => {
        if (score >= totalMoles) {
            playing = false;  // Останавливаем игру при победе
            clearTimeout(moleTimeout);  // Останавливаем таймер появления кротов
            alert('Поздравляем! Вы убили ' + score + ' кротов!');
        }
    };

    // Привязываем обработчики кликов к лункам
    for (let i = 1; i <= 9; i++) {
        getHole(i).addEventListener('click', () => handleClick(i));
    }

    // Начинаем игру
    nextMole();
})();