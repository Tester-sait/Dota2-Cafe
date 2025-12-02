let cart = [];
const cartItems = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');
const cartCount = document.getElementById('cartCount');
const cartWindow = document.getElementById('cartWindow');
const cartBtn = document.getElementById('cartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Добавление товара
document.querySelectorAll('.buyBtn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);

        // Проверяем, есть ли предмет уже в корзине
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.count++;        // увеличиваем количество
        } else {
            cart.push({ name, price, count: 1 });
        }

        updateCart();
    });
});

// Обновление корзины
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            ${item.name} - ${item.price} монет
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

    // КНОПКИ +
    document.querySelectorAll('.plusBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = btn.dataset.index;
            cart[i].count++;
            updateCart();
        });
    });

    // КНОПКИ –
    document.querySelectorAll('.minusBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = btn.dataset.index;

            cart[i].count--;

            // Если количество 0 → удалить товар
            if (cart[i].count <= 0) {
                cart.splice(i, 1);
            }

            updateCart();
        });
    });
}

// Открытие / закрытие корзины
cartBtn.addEventListener('click', () => {
    cartWindow.style.display =
        cartWindow.style.display === "block" ? "none" : "block";
});

// Переход на оформление заказа
checkoutBtn.addEventListener("click", () => {
    window.location.href = "page3.html";
});