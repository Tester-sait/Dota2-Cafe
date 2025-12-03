document.addEventListener('DOMContentLoaded', () => {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const productCards = document.querySelectorAll('.product-card');

    categoryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const selectedLabel = radio.parentElement.textContent.trim().split(' ')[0]; // Берем текст категории
            productCards.forEach(card => {
                const cardCategory = card.querySelector('.product-category').textContent;

                // Сопоставляем названия
                let show = false;
                if (selectedLabel === 'Расходники' && cardCategory === 'Расходник') show = true;
                else if (selectedLabel === 'Артефакты' && cardCategory === 'Артефакт') show = true;
                else if (selectedLabel === 'Снаряжение' && cardCategory === 'Снаряжение') show = true;
                else if (selectedLabel === 'Свитки' && cardCategory === 'Свиток') show = true;

                card.style.display = show ? 'block' : 'none';
            });
        });
    });
});
