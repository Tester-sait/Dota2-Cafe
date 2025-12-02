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

        cart.push({ name, price });
        updateCart();
    });
});

// Обновление корзины
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} монет`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalPriceEl.textContent = total;
    cartCount.textContent = cart.length;
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
