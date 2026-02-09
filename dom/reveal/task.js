document.addEventListener('DOMContentLoaded', () => {
    const revealElement = document.querySelectorAll('.reveal');
    document.addEventListener('scroll', () => {
        revealElement.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                item.classList.add('reveal_active')
            }else {
                item.classList.remove('reveal_active')
            }
        })
    });
})
