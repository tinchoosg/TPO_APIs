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



// Event listener para agregar productos al carrito
document.querySelectorAll('.add-to-cart-btn').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        addToCart(item.getAttribute("data-product"));
    });
});



var cartList = document.getElementById('cart-list');

document.getElementById('cart-button').addEventListener('click', () => {
    if (cartList.style.display === 'none' || cartList.style.display === '') {
        showCart();
    } else {
        hideCart();
    }
});

function hideCart() {
    cartList.style.display = 'none';
}

// Luego, dentro de la función showCart, elimina el if/else y simplemente muestra la lista:
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
    
   
    
   



