var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Función para agregar un producto al carrito
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

// Corrección de la función addToCart
function addToCart(productName, price, image) {
    // Buscar el producto en el carrito por nombre e imagen
    var existingItem = cartItems.find(item => item.name === productName && item.image === image);

    if (existingItem) {
        existingItem.quantity++; // Si ya existe, aumentar la cantidad
    } else {
        // Si no existe, agregar un nuevo elemento al carrito
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
    // Eliminar el producto del carrito utilizando el índice proporcionado
    cartItems.splice(index, 1);

    // Actualizar el contador del carrito y mostrar el carrito actualizado
    updateCartCounter();
    showCart();

    // Guardar los cambios en el almacenamiento local
    saveCartItemsToLocalStorage();
}

function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
function showCart() {
    var listaProductos = document.getElementById('lista-productos');

    // Limpiar la lista de productos antes de agregar nuevos elementos
    listaProductos.innerHTML = '';

    cartItems.forEach(function(item, index) { // Pasar también el índice del producto
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
            // Pasar el índice del producto al hacer clic en el botón "Eliminar"
            removeFromCart(index);
        });
        li.appendChild(removeButton);
        
        // Agregar el nuevo elemento a la lista de productos
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
    // Obtener todos los botones "Agregar al carrito"
    var botonesAgregarAlCarrito = document.querySelectorAll(".btn-add-to-cart");

    // Agregar un event listener a cada botón
    botonesAgregarAlCarrito.forEach(function(boton) {
        boton.addEventListener("click", function() {
            // Obtener los datos del producto
            var productCard = boton.closest(".product-wap");
            var productName = productCard.querySelector('a').textContent;
            var price = parseFloat(productCard.querySelector('.card-body p').textContent.replace('$', ''));
            var image = productCard.querySelector('.card-img').src;
            
            // Llamar a la función addToCart con los datos del producto
            addToCart(productName, price, image);
        });
    });

    // Llamar a la función showCart después de que el DOM se haya cargado completamente
    showCart();
});

// Guardar los elementos del carrito en el almacenamiento local
function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Función para actualizar el contador del carrito en todas las páginas
function updateCartCounter() {
    var totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

// Llamar a la función updateCartCounter después de que el DOM se haya cargado completamente en todas las páginas
document.addEventListener("DOMContentLoaded", function() {
    updateCartCounter();
});

document.addEventListener("DOMContentLoaded", function() {
    // Obtener todos los botones "Agregar al carrito"
    var botonesAgregarAlCarrito = document.querySelectorAll(".add-to-cart-btn");

    // Agregar un event listener a cada botón
    botonesAgregarAlCarrito.forEach(function(boton) {
        boton.addEventListener("click", function() {
            // Obtener los datos del producto desde el atributo data-product
            var productName = boton.dataset.product;
            // Aquí podrías obtener más datos del producto si es necesario

            // Llamar a la función addToCart con los datos del producto
            addToCart(productName, /* Otras propiedades del producto */);
        });
    });
});