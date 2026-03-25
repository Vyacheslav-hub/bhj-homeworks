document.addEventListener('DOMContentLoaded', async () => {
    const itemElement = document.querySelector('.item');
    const loaderElement = document.querySelector('#loader');
    async function fetchAndSave () {
        try {
            loaderElement.classList.add('loader_active');

            const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');

            if (!response.ok) throw new Error(`Ошибка загрузки данных: ${response.status}`);

            const result = await response.json();

            const data = Object.values(result.response.Valute).map(v => ({
                code: v.CharCode,
                value: v.Value,
                currency: 'руб.'
            }));


            localStorage.setItem('valutes', JSON.stringify(data));
            renderItems(data)
        }catch (e) {
            console.error(`Ошибка загрузки данных: ${e}`)
            itemElement.innerHTML = `Ошибка загрузки данных`;
        }finally {
            loaderElement.classList.remove('loader_active');
        }
    }

    function renderItems(data) {
        itemElement.innerHTML = '';
        data.forEach(v => {
            const row = document.createElement('div');
            row.classList.add('item-row');
            row.innerHTML = `
            <div class='item__code'>${v.code}</div>
            <div class='item__value'>${v.value}</div>
            <div class='item__currency'>${v.currency}</div>
            `
            itemElement.append(row);
        })
    }

    // проверяем localStorage
    // 1. Сначала показываем кэш
    const stored = localStorage.getItem('valutes');
    if (stored) {
        renderItems(JSON.parse(stored));
    }

    // 2. ВСЕГДА обновляем данные с сервера
    fetchAndSave();
})
