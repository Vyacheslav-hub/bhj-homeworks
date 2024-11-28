document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const itemsContainer = document.getElementById("items");

    // Функция для создания элемента валюты
    function createCurrencyElement(code, value) {
        const item = document.createElement("div");
        item.classList.add("item");

        const codeElement = document.createElement("div");
        codeElement.classList.add("item__code");
        codeElement.textContent = code;

        const valueElement = document.createElement("div");
        valueElement.classList.add("item__value");
        valueElement.textContent = value;

        const currencyElement = document.createElement("div");
        currencyElement.classList.add("item__currency");
        currencyElement.textContent = "руб.";

        item.appendChild(codeElement);
        item.appendChild(valueElement);
        item.appendChild(currencyElement);

        return item;
    }

    // Функция для отображения данных о валютах
    function displayCurrencies(currencies) {
        itemsContainer.innerHTML = ""; // Очищаем контейнер
        for (const key in currencies) {
            const currency = currencies[key];
            const itemElement = createCurrencyElement(currency.CharCode, currency.Value);
            itemsContainer.appendChild(itemElement);
        }
    }

    // Функция загрузки данных о валютах
    async function loadCurrencyData() {
        // Показываем анимацию загрузки
        loader.classList.add("loader_active");

        try {
            const response = await fetch("https://students.netoservices.ru/nestjs-backend/slow-get-courses");
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных");
            }

            const data = await response.json();
            const currencies = data.response.Valute;

            // Сохраняем данные в localStorage
            localStorage.setItem("cachedCurrencies", JSON.stringify(currencies));
            localStorage.setItem("cacheTime", Date.now()); // Сохраняем время кэширования

            // Обновляем отображение
            displayCurrencies(currencies);

        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        } finally {
            // Скрываем анимацию загрузки
            loader.classList.remove("loader_active");
        }
    }

    // Проверка кэша и начальная загрузка
    function initializeCurrencies() {
        const cachedCurrencies = localStorage.getItem("cachedCurrencies");
        const cacheTime = localStorage.getItem("cacheTime");
        const isCacheExpired = !cacheTime || (Date.now() - cacheTime > 3600000); // Проверка на устаревание кэша

        // Если есть кэшированные данные, сразу отображаем их
        if (cachedCurrencies) {
            const currencies = JSON.parse(cachedCurrencies);
            displayCurrencies(currencies);
        }

        // Если кэш отсутствует или устарел, загружаем новые данные
        if (!cachedCurrencies || isCacheExpired) {
            loadCurrencyData();
        } else {
            // Если данные из кэша уже актуальны, скрываем загрузчик
            loader.classList.remove('loader_active');
        }
    }

    // Запуск
    initializeCurrencies();
});