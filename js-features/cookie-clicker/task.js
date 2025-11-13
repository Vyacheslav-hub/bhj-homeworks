const counterElement = document.getElementById("clicker__counter");
const cookieElement = document.getElementById("cookie");

let counter = 0;
let click = false;
let firstClick = true;
let startTime;


function counterClick () {
    counter++;
    counterElement.textContent = counter;
}

function cookieSize () {
    cookieElement.width = 220;
    click = true;
}

function averageCountClick () {
    let timePassed = (Date.now() - startTime) / 1000;
    let avgSpeed = counter / timePassed ;
    document.getElementById("clicker__speed").textContent = Number(avgSpeed.toFixed(2));
}

cookieElement.onclick = () => {
    if (firstClick) {
        startTime = Date.now();
        firstClick = false;
    }

        counterClick();
        averageCountClick ();
        if(!click) {
            cookieSize();
        }else {
            cookieElement.width = 200;
            click = false;
        }
}


