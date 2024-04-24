var cartItems = [];

function addToCart(productName) {
    cartItems.push(productName);
    updateCartCounter();
}

function updateCartCounter() {
    document.getElementById("cart-count").innerText = cartItems.length;
}

function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item !== productName);
    showCart();
    updateCartCounter();
}

document.querySelectorAll('.add-to-cart-btn').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        addToCart(item.getAttribute("data-product"));
    });
});

var cartList = document.getElementById('cart-list');
var cartIcon = document.getElementById('cart-icon');

cartIcon.addEventListener('click', function() {
    if (cartList.style.display === 'none' || cartList.style.display === '') {
        showCart();
    } else {
        hideCart();
    }
});

function hideCart() {
    cartList.style.display = 'none';
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
}
    
   
    
   



