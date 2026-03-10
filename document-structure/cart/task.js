document.addEventListener('DOMContentLoaded', () => {
    let arrCartProduct = [];

    const elementProducts = document.querySelector('.products');
    const elementCart = document.querySelector('.cart');
    const elementCartProducts = document.querySelector('.cart__products');

    loadCart ();

    elementProducts.addEventListener('click', e => {
        const elementProduct = e.target.closest('.product');
        if (!elementProduct) return;

        const productID = elementProduct.dataset.id;
        const elementProductImg = elementProduct.querySelector('.product__image');
        const productImg = elementProductImg.src;
        const elementValue= elementProduct.querySelector('.product__quantity-value');

        if (e.target.closest('.product__quantity-control_dec')) changeProductQuantity(elementValue, -1);

        if (e.target.closest('.product__quantity-control_inc')) changeProductQuantity(elementValue , 1);


        if (e.target.closest('.product__add')) {
            animatingAdditionProduct(elementProductImg, elementCart);
            addProductInCart(productID, productImg, +elementValue.textContent);
            elementValue.textContent = 1;
        }
    })

    //Для удаления из корзины товара
    elementCartProducts.addEventListener('click', e => {
        const btnRemove = e.target.closest('.cart__product-remove');
        if (!btnRemove) return;

        const elementProduct = btnRemove.closest('.cart__product');
        const idProduct = elementProduct.dataset.id;

        elementProduct.remove();

        arrCartProduct = arrCartProduct.filter(p => p.id !== idProduct);
        setProducts();
        updateCartVisibility();
    })
    //Для скрытия корзины если в ней нет товаров
    function updateCartVisibility() {
        elementCart.style.display = arrCartProduct.length ? 'block' : 'none';
    }

    //Для увеличения и уменьшения количества товаров
    function changeProductQuantity(element, delta) {
        let value = parseInt(element.textContent) || 0;
        value += delta;
        element.textContent = value < 1 ? 1 : value;
    }

    //Для добавления в корзину товары
    function addProductInCart (id, src, value) {
        const existingProduct =  elementCartProducts.querySelector(`[data-id="${id}"]`);

        if (existingProduct) {
            const count = existingProduct.querySelector('.cart__product-count');
            count.textContent = Number(count.textContent) + value;

            const existingItem = arrCartProduct.find(p => p.id === id);
            existingItem.value += value;
        }else {
            const elementProduct = createCartProductElement({id, src, value});
            elementCartProducts.append(elementProduct);
            arrCartProduct.push({id, src, value})
        }

        setProducts();
        updateCartVisibility();
    }

    function createCartProductElement({id, src, value}) {
        const elementProduct = document.createElement('div');
        elementProduct.classList.add('cart__product');
        elementProduct.dataset.id = id;

        const elementProductImg = document.createElement('img');
        elementProductImg.classList.add('cart__product-image');
        elementProductImg.src = src;

        const elementProductCount = document.createElement('div');
        elementProductCount.classList.add('cart__product-count');
        elementProductCount.textContent = value;

        const btnRemoveBasket = document.createElement('div');
        btnRemoveBasket.classList.add('cart__product-remove');

        elementProduct.append(elementProductImg, elementProductCount, btnRemoveBasket);

        return elementProduct;
    }

    function animatingAdditionProduct (elProductImg, elCart) {
        const imgRect = elProductImg.getBoundingClientRect();
        const cartRect = elCart.getBoundingClientRect();

        const clone = elProductImg.cloneNode(true);

        clone.style.position = 'fixed';
        clone.style.left = imgRect.left + 'px';
        clone.style.top = imgRect.top + 'px';
        clone.style.width = imgRect.width + 'px';
        clone.style.height = imgRect.height + 'px';
        clone.style.transition = 'transform 1s ease, opacity 0.9s ease';
        clone.style.zIndex = '1000';

        document.body.appendChild(clone);

        // центр картинки
        const imgCenterX = imgRect.left + imgRect.width / 2;
        const imgCenterY = imgRect.top + imgRect.height / 2;

        // центр корзины
        const cartCenterX = cartRect.left + cartRect.width / 2;
        const cartCenterY = cartRect.top + cartRect.height / 2;

        // смещение
        const deltaX = cartCenterX - imgCenterX;
        const deltaY = cartCenterY - imgCenterY;

        requestAnimationFrame(() => {
            clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
            clone.style.opacity = '0.5';
        });

        clone.addEventListener('transitionend', () => clone.remove());
    }


    function setProducts () {
        localStorage.setItem('cart', JSON.stringify(arrCartProduct));
    }

    function loadCart () {
       arrCartProduct =  JSON.parse(localStorage.getItem('cart')) || [];
       elementCartProducts.innerHTML = '';
       arrCartProduct.forEach(product => elementCartProducts.append(createCartProductElement(product)));
       updateCartVisibility();
    }
})
