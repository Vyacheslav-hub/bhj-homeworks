const dropdownValue = document.querySelector(".dropdown__value");
const dropdownList = document.querySelector(".dropdown__list");

dropdownValue.addEventListener('click', () => {
    dropdownList.classList.toggle("dropdown__list_active");
})

dropdownList.addEventListener('click', e => {
    e.preventDefault();
    const dropdownItems = e.target.closest('.dropdown__link');

    dropdownValue.textContent = dropdownItems.textContent;
    dropdownList.classList.remove("dropdown__list_active");
})