document.addEventListener('DOMContentLoaded', () => {
    // Слушаем все клики по элементам с классом "has-tooltip"
    document.querySelectorAll('.has-tooltip').forEach((tooltipElement) => {
        tooltipElement.addEventListener('click', (event) => {
            event.preventDefault(); // Отключаем стандартное поведение ссылки

            // Проверяем, есть ли уже активная подсказка
            const activeTooltip = document.querySelector('.tooltip_active');
            if (activeTooltip) {
                activeTooltip.remove(); // Удаляем её
                if (activeTooltip === tooltipElement.nextElementSibling) {
                    return; // Если кликнули по тому же элементу, больше ничего не делаем
                }
            }

            // Создаём новую подсказку
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip tooltip_active';
            tooltip.textContent = tooltipElement.title;
            document.body.appendChild(tooltip);

            // Определяем положение подсказки относительно элемента
            const { top, left, height } = tooltipElement.getBoundingClientRect();
            tooltip.style.top = `${top + height}px`;
            tooltip.style.left = `${left}px`;
        });
    });

    // Удаляем подсказку при клике вне элементов с подсказками
    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('has-tooltip')) {
            const activeTooltip = document.querySelector('.tooltip_active');
            if (activeTooltip) {
                activeTooltip.remove();
            }
        }
    });
});