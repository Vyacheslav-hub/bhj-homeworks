(() => {
const dead = document.getElementById("dead");
const lost = document.getElementById("lost");
let countDead = 0;
let countLost = 0;



for (let i = 1; i <= 9; i++ ) {
    const hole = getHole(i);
    hole.onclick = function () {
        if (hole.classList.contains("hole_has-mole")) {
            countDead++;
            dead.textContent = countDead;
        }else {
            countLost++;
            lost.textContent = countLost;
        }

        if (countDead === 10) {
            alert(`Победа! Вы убили ${countDead} кротов`);
            dead.textContent = 0;
            lost.textContent = 0;
            countDead = 0;
            countLost = 0;
        }else if (countLost === 5) {
            alert(`Игра окончена( Вы промахнулись ${countLost} раза`);
            dead.textContent = 0;
            lost.textContent = 0;
            countDead = 0;
            countLost = 0;
        }
    }
}
})();
