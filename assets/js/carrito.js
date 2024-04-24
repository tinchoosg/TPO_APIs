var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(productName) {
    cartItems.push(productName);
    updateCartCounter();
    saveCartItemsToLocalStorage();
}

function updateCartCounter() {
    document.getElementById("cart-count").innerText = cartItems.length;
}

function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item !== productName);
    showCart();
    updateCartCounter();
    saveCartItemsToLocalStorage();
}

function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.querySelectorAll('.add-to-cart-btn').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        addToCart(item.getAttribute("data-product"));
    });
});

var cartList = document.getElementById('cart-list');
var cartIcon = document.getElementById('cart-icon');

var isCartVisible = false;

function hideCart() {
    cartList.style.display = 'none';
    isCartVisible = false;
}

function showCart() {
    cartList.innerHTML = '';

    cartItems.forEach(item => {
        var li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
            removeFromCart(item);
        });
        cartList.appendChild(li);
    });

    cartList.style.display = 'block';
    isCartVisible = true;
}


hideCart();

cartIcon.addEventListener('click', function() {
    if (isCartVisible) {
        hideCart();
    } else {
        showCart();
    }
});

updateCartCounter();
