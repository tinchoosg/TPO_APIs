var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCartFromCard(productCard) {
    var productName = productCard.querySelector('.nombre').textContent;
    var price = parseFloat(productCard.querySelector('.precio').textContent.replace('$', ''));
    var image = productCard.querySelector('.imagen').src;
    addToCart(productName, price, image);
}

var productCards = document.querySelectorAll('.product-card');

productCards.forEach(function(productCard) {
    var addToCartButton = productCard.querySelector('.btn-add-to-cart');
    addToCartButton.addEventListener('click', function() {
        addToCartFromCard(productCard);
    });
});


function addToCart(productName, price, image) {
    // Buscar el producto en el carrito por nombre e imagen
    var existingItem = cartItems.find(item => item.name === productName && item.image === image);

    if (existingItem) {
        existingItem.quantity++; 
    } else {
        cartItems.push({
            name: productName,
            price: price,
            quantity: 1,
            image: image
        });
    }

    updateCartCounter(); 
    saveCartItemsToLocalStorage();
    showCart();
}



function updateCartCounter() {
    var totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

function removeFromCart(index) {
    cartItems.splice(index, 1);

    updateCartCounter();
    showCart();

    saveCartItemsToLocalStorage();
}

function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
function showCart() {
    var listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';

    cartItems.forEach(function(item, index) { 
        var li = document.createElement('li');
        var img = document.createElement('img');
        img.src = item.image;
        li.appendChild(img);
        var productName = document.createElement('span');
        productName.textContent = item.name;
        li.appendChild(productName);
        var quantity = document.createElement('span');
        quantity.textContent = 'Cantidad: ';
        var decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', function() {
            if (item.quantity > 1) {
                item.quantity--;
                updateCartCounter();
                saveCartItemsToLocalStorage();
                showCart();
            }
        });
        quantity.appendChild(decreaseButton);
        var quantityValue = document.createElement('span');
        quantityValue.textContent = item.quantity;
        quantity.appendChild(quantityValue);
        var increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', function() {
            item.quantity++;
            updateCartCounter();
            saveCartItemsToLocalStorage();
            showCart();
        });
        quantity.appendChild(increaseButton);
        li.appendChild(quantity);
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', function() {
            removeFromCart(index);
        });
        li.appendChild(removeButton);
        
        listaProductos.appendChild(li);
    });

    var total = calcularTotal();

    document.getElementById('subtotal').textContent = '$' + total.subtotal.toFixed(2);
    document.getElementById('impuestos').textContent = '$' + total.impuestos.toFixed(2);
    document.getElementById('total').textContent = '$' + total.total.toFixed(2);
}

function calcularTotal() {
    var subtotal = 0;

    cartItems.forEach(function(item) {
        subtotal += item.price * item.quantity;
    });

    var impuestos = subtotal * 0.10;
    var total = subtotal + impuestos;

    return {
        subtotal: subtotal,
        impuestos: impuestos,
        total: total
    };
}

document.addEventListener("DOMContentLoaded", function() {
    var botonesAgregarAlCarrito = document.querySelectorAll(".btn-add-to-cart");

    botonesAgregarAlCarrito.forEach(function(boton) {
        boton.addEventListener("click", function() {
            var productCard = boton.closest(".product-wap");
            var productName = productCard.querySelector('a').textContent;
            var price = parseFloat(productCard.querySelector('.card-body p').textContent.replace('$', ''));
            var image = productCard.querySelector('.card-img').src;
            
            addToCart(productName, price, image);
        });
    });

    showCart();
});

function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCartCounter() {
    var totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

// Llamar a la función updateCartCounter después de que el DOM se haya cargado completamente en todas las páginas
document.addEventListener("DOMContentLoaded", function() {
    updateCartCounter();
});

document.addEventListener("DOMContentLoaded", function() {
    var botonesAgregarAlCarrito = document.querySelectorAll(".add-to-cart-btn");

    botonesAgregarAlCarrito.forEach(function(boton) {
        boton.addEventListener("click", function() {
            var productName = boton.dataset.product;
            //obtener más datos del producto si es necesario

            addToCart(productName, /* Otras propiedades del producto */);
        });
    });
});

// Funcoines para finalizar compra
document.addEventListener("DOMContentLoaded", function() {
    var btnFinalizarCompra = document.querySelector(".btn-finalizar");
    btnFinalizarCompra.addEventListener("click", finalizarCompra);
});

function finalizarCompra() {
    cartItems = [];
    updateCartCounter(); 
    showCart(); 
    alert("¡Su compra ha sido realizada con éxito!");
}

