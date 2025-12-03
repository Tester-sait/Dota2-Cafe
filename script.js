// Этот скрипт работает только на странице page2.html
document.addEventListener('DOMContentLoaded', () => {

    // Проверяем, существуют ли необходимые элементы корзины
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) {
        // Если элементов нет (мы не на page2.html), завершаем выполнение скрипта
        return;
    }

    const totalPriceEl = document.getElementById('totalPrice');
    const cartCount = document.getElementById('cartCount');
    const cartWindow = document.getElementById('cartWindow');
    const cartBtn = document.getElementById('cartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Получаем корзину из локального хранилища (для сохранения при перезагрузке)
    let cart = JSON.parse(localStorage.getItem('dota2_cart')) || [];

    // --- ФУНКЦИИ КОРЗИНЫ ---

    // Обновление корзины
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        // Обработка пустой корзины
        if (cart.length === 0) {
            cartItems.innerHTML = '<li style="color:#888;">Корзина пуста. Добавьте предметы!</li>';
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = 'Корзина пуста';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Оформить заказ';
        }

        cart.forEach((item, index) => {
            const li = document.createElement('li');

            li.innerHTML = `
                ${item.name} <span style="color:#ffd700;">(${item.price} монет)</span>
                <div class="count-box">
                    <button class="minusBtn" data-index="${index}">-</button>
                    <span>${item.count}</span>
                    <button class="plusBtn" data-index="${index}">+</button>
                </div>
            `;

            cartItems.appendChild(li);

            total += item.price * item.count;
            itemCount += item.count;
        });

        totalPriceEl.textContent = total;
        cartCount.textContent = itemCount;

        // Сохраняем корзину в локальном хранилище
        localStorage.setItem('dota2_cart', JSON.stringify(cart));
        
        // Переназначаем слушателей событий для кнопок +/- после обновления DOM
        attachCartListeners();
    }

    // Назначение слушателей для кнопок +/-
    function attachCartListeners() {
        // КНОПКИ +
        document.querySelectorAll('.plusBtn').forEach(btn => {
            btn.onclick = () => {
                const i = btn.dataset.index;
                cart[i].count++;
                updateCart();
            };
        });

        // КНОПКИ –
        document.querySelectorAll('.minusBtn').forEach(btn => {
            btn.onclick = () => {
                const i = btn.dataset.index;

                cart[i].count--;

                // Если количество 0 → удалить товар
                if (cart[i].count <= 0) {
                    cart.splice(i, 1);
                }

                updateCart();
            };
        });
    }

    // --- ИНИЦИАЛИЗАЦИЯ И ОБРАБОТКА КЛИКОВ ---

    // Добавление товара (кнопки "Придбати")
    document.querySelectorAll('.buyBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.currentTarget.dataset.name;
            const price = parseInt(e.currentTarget.dataset.price);

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.count++;
            } else {
                cart.push({ name, price, count: 1 });
            }

            updateCart();
        });
    });

    // Открытие / закрытие корзины
    cartBtn.addEventListener('click', () => {
        // Переключаем видимость
        const isHidden = cartWindow.style.display === "none" || cartWindow.style.display === "";
        cartWindow.style.display = isHidden ? "block" : "none";
    });

    // Переход на оформление заказа
    checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            window.location.href = "page3.html";
        } else {
            alert("Сначала добавьте предметы в корзину!");
        }
    });

    // Первоначальная загрузка корзины при загрузке страницы
    updateCart(); 
});