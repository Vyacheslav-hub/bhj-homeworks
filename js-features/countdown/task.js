let time = 10;
const timerElement = document.getElementById("timer");
const hiElement = document.getElementById("Hi");

const interval = setInterval(updateTimerDisplay, 1000);

function updateTimerDisplay() {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    if (hours < 10){
        hours = "0" + hours;
    }

    if (minutes < 10){
        minutes = "0" + minutes;
    }

    if (seconds < 10){
        seconds = "0" + seconds;
    }
    timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(interval);
        // window.location = "HI.rtf"
        hiElement.click();
        alert(`Вы победили в конкурсе!`)
    }
}
