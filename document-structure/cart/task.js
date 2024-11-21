document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart');
    const cartProducts = cart.querySelector('.cart__products');

    // Загрузка корзины из localStorage
    loadCart();

    // Функция изменения количества товара
    document.querySelectorAll('.product__quantity-controls').forEach(control => {
        control.addEventListener('click', (event) => {
            const quantityValue = control.querySelector('.product__quantity-value');
            let currentQuantity = parseInt(quantityValue.textContent);

            if (event.target.classList.contains('product__quantity-control_inc')) {
                quantityValue.textContent = currentQuantity + 1;
            } else if (
                event.target.classList.contains('product__quantity-control_dec') &&
                currentQuantity > 1
            ) {
                quantityValue.textContent = currentQuantity - 1;
            }
        });
    });

    // Функция добавления товара в корзину
    document.querySelectorAll('.product__add').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const productId = product.dataset.id;
            const productImage = product.querySelector('.product__image').src;
            const productQuantity = parseInt(product.querySelector('.product__quantity-value').textContent);

            // Проверяем, есть ли уже товар в корзине
            const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

            if (existingProduct) {
                // Увеличиваем количество существующего товара
                const productCount = existingProduct.querySelector('.cart__product-count');
                productCount.textContent = parseInt(productCount.textContent) + productQuantity;
            } else {
                // Создаем новую запись в корзине
                const cartProduct = document.createElement('div');
                cartProduct.classList.add('cart__product');
                cartProduct.dataset.id = productId;

                cartProduct.innerHTML = `
          <img class="cart__product-image" src="${productImage}" alt="Product Image">
          <div class="cart__product-count">${productQuantity}</div>
        `;

                cartProducts.appendChild(cartProduct);
            }

            saveCart(); // Сохранение корзины
            animateProductToCart(product.querySelector('.product__image')); // Анимация
            cart.style.display = 'block'; // Отображение корзины
        });
    });

    // Функция анимации перемещения товара в корзину
    function animateProductToCart(productImage) {
        const clone = productImage.cloneNode(true);
        clone.classList.add('animated-product');
        const rect = productImage.getBoundingClientRect();
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        document.body.appendChild(clone);

        const cartRect = cart.getBoundingClientRect();
        const cartCenterX = cartRect.left + cartRect.width / 2;
        const cartCenterY = cartRect.top + cartRect.height / 2;

        setTimeout(() => {
            clone.style.left = `${cartCenterX}px`;
            clone.style.top = `${cartCenterY}px`;
        }, 0);

        clone.addEventListener('transitionend', () => {
            clone.remove();
        });
    }

    // Сохранение корзины в localStorage
    function saveCart() {
        const cartData = [];
        cartProducts.querySelectorAll('.cart__product').forEach(product => {
            const id = product.dataset.id;
            const image = product.querySelector('.cart__product-image').src;
            const count = parseInt(product.querySelector('.cart__product-count').textContent);
            cartData.push({ id, image, count });
        });
        localStorage.setItem('cart', JSON.stringify(cartData));
    }

    // Загрузка корзины из localStorage
    function loadCart() {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if (cartData) {
            cartData.forEach(({ id, image, count }) => {
                const cartProduct = document.createElement('div');
                cartProduct.classList.add('cart__product');
                cartProduct.dataset.id = id;

                cartProduct.innerHTML = `
          <img class="cart__product-image" src="${image}" alt="Product Image">
          <div class="cart__product-count">${count}</div>
        `;

                cartProducts.appendChild(cartProduct);
            });
            if (cartData.length > 0) {
                cart.style.display = 'block';
            }
        }
    }
});