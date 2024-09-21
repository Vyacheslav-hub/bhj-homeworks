let timer = 10;
const elementTimerr = document.getElementById('timer');
let countdown = setInterval(function () {
    if (timer >= 0 ) {
        let timeString = new Date(timer * 1000).toLocaleTimeString('ru', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        });
        elementTimerr.textContent = timeString;
        timer--;
    } else {
        clearInterval(countdown);
        alert('Вы победили в конкурсе!');
    }
}, 1000);