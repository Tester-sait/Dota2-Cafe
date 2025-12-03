document.addEventListener('DOMContentLoaded', () => {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const productCards = document.querySelectorAll('.product-card');

    categoryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const selected = radio.dataset.cat;

            productCards.forEach(card => {
                const cardCategory = card.querySelector('.product-category').textContent.trim();

                if (selected === "Все" || selected === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
