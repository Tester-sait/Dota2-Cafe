document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    const totalPriceEl = document.getElementById('totalPrice');
    const cartCount = document.getElementById('cartCount');
    const cartWindow = document.getElementById('cartWindow');
    const cartBtn = document.getElementById('cartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    let cart = JSON.parse(localStorage.getItem('dota2_cart')) || [];

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<li style="color:#888;">Кошик порожній!</li>';
            checkoutBtn.disabled = true;
        } else {
            checkoutBtn.disabled = false;
        }

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} <span>(${item.price}💰)</span>
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
        localStorage.setItem('dota2_cart', JSON.stringify(cart));
        attachCartListeners();
    }

    function attachCartListeners() {
        document.querySelectorAll('.plusBtn').forEach(btn => {
            btn.onclick = () => { cart[btn.dataset.index].count++; updateCart(); };
        });
        document.querySelectorAll('.minusBtn').forEach(btn => {
            btn.onclick = () => {
                const i = btn.dataset.index;
                cart[i].count--;
                if (cart[i].count <= 0) cart.splice(i, 1);
                updateCart();
            };
        });
    }

    document.querySelectorAll('.buyBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.currentTarget.dataset.name;
            const price = parseInt(e.currentTarget.dataset.price);
            const existing = cart.find(i => i.name === name);
            if (existing) existing.count++; else cart.push({ name, price, count: 1 });
            updateCart();
        });
    });

    cartBtn.addEventListener('click', () => {
        cartWindow.style.display = (cartWindow.style.display === "block") ? "none" : "block";
    });

    checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) window.location.href = "page3.html";
    });

    updateCart(); 
});