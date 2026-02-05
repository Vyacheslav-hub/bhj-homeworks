document.addEventListener('DOMContentLoaded', () => {
    const tabElements = document.querySelectorAll('.tab');
    const tabContentElements = document.querySelectorAll(".tab__content");

    document.querySelector('.tab__navigation').addEventListener('click', e => {
        const tab = e.target.closest('.tab');

        if (!tab) return;

        const index = Array.from(tabElements).indexOf(tab);

        tabElements.forEach(item => {
            item.classList.remove('tab_active');
        })

        tabContentElements.forEach(item => {
            item.classList.remove('tab__content_active');
        })

        tab.classList.add('tab_active');
        tabContentElements[index].classList.add('tab__content_active');
    })
})
