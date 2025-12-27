document.addEventListener('DOMContentLoaded', () => {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');

    function filter() {
        const selected = document.querySelector('input[name="category"]:checked').dataset.cat;
        const text = searchInput.value.toLowerCase();

        productCards.forEach(card => {
            const cat = card.querySelector('.product-category').textContent.trim();
            const name = card.querySelector('.product-name').textContent.toLowerCase();
            
            const matchCat = (selected === "Все" || selected === cat);
            const matchSearch = name.includes(text);

            card.style.display = (matchCat && matchSearch) ? 'block' : 'none';
        });
    }

    categoryRadios.forEach(r => r.addEventListener('change', filter));
    searchInput.addEventListener('input', filter);
});