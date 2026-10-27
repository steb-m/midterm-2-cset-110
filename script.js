document.addEventListener('DOMContentLoaded', ready);

function ready() {
    let addButtons = document.getElementsByClassName('shop-item-button');
    for (let element of addButtons) {
        element.addEventListener('click', addToCart);
    }

    let removeButtons = document.getElementsByClassName('btn-danger');
    for (let element of removeButtons) {
        element.addEventListener('click', removeItem);
    }

    let qtyInputs = document.getElementsByClassName('cart-quantity-input');
    for (let element of qtyInputs) {
        element.addEventListener('change', changeQty);
    }

    let purchaseBtn = document.getElementsByClassName('btn-purchase')[0];
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', purchase);
    }

    updateTotal();
}

function addToCart(event) {
    let button = event.target;
    let shopItem = button.closest('.shop-item');

    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    let cartContainer = document.getElementById('cartItems');
    let cartTitles = cartContainer.getElementsByClassName('cart-item-title');

    for (let element of cartTitles) {
        if (element.innerText.trim() === title.trim()) {
            let row = element.closest('.cart-row');
            let input = row.getElementsByClassName('cart-quantity-input')[0];
            input.value = Number(input.value) + 1;
            updateTotal();
            return;
        }
    }

    let newRow = document.createElement('div');
    newRow.className = 'cart-row';
    newRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" min="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;

    newRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem);
    newRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQty);

    cartContainer.appendChild(newRow);
    updateTotal();
}

function removeItem(event) {
    let button = event.target;
    let row = button.closest('.cart-row');
    if (row) {
        row.remove();
        updateTotal();
    }
}

function changeQty(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function updateTotal() {
    let cartContainer = document.getElementById('cartItems');
    let rows = cartContainer.getElementsByClassName('cart-row');
    let total = 0;

    for (let element of rows) {
        let priceElement = element.getElementsByClassName('cart-price')[0];
        let qtyElement = element.getElementsByClassName('cart-quantity-input')[0];

        if (priceElement && qtyElement) {
            let price = parseFloat(priceElement.innerText.replace('$', ''));
            let qty = Number(qtyElement.value);
            total += (price * qty);
        }
    }

    let totalPriceElement = document.getElementsByClassName('cart-total-price')[0];
    if (totalPriceElement) {
        totalPriceElement.innerText = '$' + total.toFixed(2);
    }
}

function purchase() {
    let cartContainer = document.getElementById('cartItems');
    if (cartContainer.children.length === 0) {
        alert('Your cart is empty');
        return;
    }
    alert('Thank you for your purchase!');
    cartContainer.innerHTML = '';
    updateTotal();
}