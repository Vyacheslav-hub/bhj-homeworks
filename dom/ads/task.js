document.addEventListener('DOMContentLoaded', () => {
    const rotators = document.querySelectorAll('.rotator');

        rotators.forEach(rotator => {
            function rotate () {
            const rotatorElements = rotator.querySelectorAll('.rotator__case');

            const activeRotator = rotator.querySelector('.rotator__case_active');

            activeRotator.classList.remove('rotator__case_active');


            let nextElement = activeRotator.nextElementSibling;

            if (!nextElement) {
                nextElement = rotatorElements[0];
            }


            nextElement.style.color = nextElement.dataset.color;

            nextElement.classList.add('rotator__case_active');

            let speed = +nextElement.dataset.speed;

            setTimeout(rotate,speed);
            }
            rotate();
        })
})
