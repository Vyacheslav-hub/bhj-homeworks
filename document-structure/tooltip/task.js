document.addEventListener('DOMContentLoaded', () => {
let createTooltip;
let activeElement = null;

function createElementTooltip(element) {
    createTooltip = document.createElement('div');
    createTooltip.classList.add('tooltip', 'tooltip_active');
    createTooltip.textContent = element.getAttribute('title');
    document.body.append(createTooltip);
    getRect(element);
}
function getRect (element) {
    const rectHasTooltip = element.getBoundingClientRect();
    const rectCreateElement = createTooltip.getBoundingClientRect();
    createTooltip.style.position = 'absolute';

    let top = rectHasTooltip.bottom + window.scrollY;
    let left = rectHasTooltip.left + (rectHasTooltip.width / 2) - (rectCreateElement.width / 2);

    const rectData = element.dataset.position;

    if (rectData === 'top') {
        top = rectHasTooltip.top - rectCreateElement.height  + window.scrollY;
    }

    if (rectData === 'right') {
        top = rectHasTooltip.top + (rectHasTooltip.height / 2) - (rectCreateElement.height / 2);
        left = rectHasTooltip.left + rectHasTooltip.width + window.scrollX;
    }

    if (rectData === 'left') {
        top = rectHasTooltip.top + (rectHasTooltip.height / 2) - (rectCreateElement.height / 2);
        left = rectHasTooltip.left - rectCreateElement.width + window.scrollX;
    }

    createTooltip.style.top = top + 'px';
    createTooltip.style.left = left + 'px';
}

document.body.addEventListener('click', e => {
    const hasTooltip = e.target.closest('.has-tooltip');
    if (!hasTooltip) return;

    e.preventDefault();

    if (createTooltip && activeElement === hasTooltip) {
        createTooltip.remove();
        createTooltip = null;
        activeElement = null;
        return;
    }

    if (createTooltip) createTooltip.remove();

    createElementTooltip(hasTooltip);
    activeElement = hasTooltip;
});
});
