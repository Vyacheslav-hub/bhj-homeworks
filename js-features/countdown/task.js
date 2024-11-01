const timerElement = document.getElementById('timer');
let timer = 10;
let countdoun = setInterval(() => {
    if (timer >= 0) {
        let timeString = new Date(timer * 1000).toLocaleTimeString('ru', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC',
        })
        timerElement.textContent = timeString;
        timer--;
    } else {
        clearInterval(countdoun);
        alert(`Вы победили в конкурсе!`);
    };
}, 1000)
