var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(productName, price, image) {
    var existingItem = cartItems.find(item => item.name === productName);

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
    showCart(); // Asegúrate de llamar a showCart() aquí
}


function updateCartCounter() {
    var totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item.name !== productName);
    showCart();
    updateCartCounter();
    saveCartItemsToLocalStorage();
}

function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadShopProducts() {
    var shopProducts = [];

    // Hacer una solicitud HTTP para obtener los productos de shop.html
    var shopRequest = new XMLHttpRequest();
    shopRequest.open('GET', 'shop.html', true);
    shopRequest.onreadystatechange = function() {
        if (shopRequest.readyState === XMLHttpRequest.DONE) {
            if (shopRequest.status === 200) {
                // Procesar la respuesta y extraer los productos de shop.html
                var parser = new DOMParser();
                var shopDoc = parser.parseFromString(shopRequest.responseText, 'text/html');
                var products = shopDoc.querySelectorAll('.producto');
                products.forEach(function(product) {
                    var name = product.querySelector('.nombre').textContent;
                    var price = parseFloat(product.querySelector('.precio').textContent.replace('$', ''));
                    var image = product.querySelector('.imagen').src;
                    shopProducts.push({ name: name, price: price, image: image });
                });
                // Una vez que se han obtenido todos los productos, mostrar el carrito
                showCart();
            } else {
                console.error('Error al cargar los productos de shop.html');
            }
        }
    };
    shopRequest.send();

    // Hacer una solicitud HTTP para obtener los productos de shop-single.html
    var singleRequest = new XMLHttpRequest();
    singleRequest.open('GET', 'shop-single.html', true);
    singleRequest.onreadystatechange = function() {
        if (singleRequest.readyState === XMLHttpRequest.DONE) {
            if (singleRequest.status === 200) {
                // Procesar la respuesta y extraer los productos de shop-single.html
                var parser = new DOMParser();
                var singleDoc = parser.parseFromString(singleRequest.responseText, 'text/html');
                var products = singleDoc.querySelectorAll('.producto-single');
                products.forEach(function(product) {
                    var name = product.querySelector('.nombre').textContent;
                    var price = parseFloat(product.querySelector('.precio').textContent.replace('$', ''));
                    var image = product.querySelector('.imagen').src;
                    shopProducts.push({ name: name, price: price, image: image });
                });
                // Una vez que se han obtenido todos los productos, mostrar el carrito
                showCart();
            } else {
                console.error('Error al cargar los productos de shop-single.html');
            }
        }
    };
    singleRequest.send();

    return shopProducts;
}

// Llamar a la función loadShopProducts para cargar los productos al iniciar la página
loadShopProducts();


function showCart() {
    var listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar la lista antes de volver a mostrar los productos

    cartItems.forEach(function(item) {
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
            removeFromCart(item.name);
        });
        li.appendChild(removeButton);
        listaProductos.appendChild(li);
    });

    // Calcular el total
    var total = calcularTotal();

    // Actualizar los elementos en la interfaz con los valores calculados
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

document.addEventListener('DOMContentLoaded', function() {
    var shopProducts = loadShopProducts();

    shopProducts.forEach(function(product) {
        var addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Agregar al Carrito';
        addToCartButton.addEventListener('click', function() {
            addToCart(product.name, product.price, product.image);
        });

        // Suponiendo que hay un elemento en shop.html o shop-single.html para mostrar cada producto
        var productContainer = document.createElement('div');
        var productName = document.createElement('h3');
        productName.textContent = product.name;
        var productPrice = document.createElement('p');
        productPrice.textContent = 'Precio: $' + product.price.toFixed(2);
        var productImage = document.createElement('img');
        productImage.src = product.image;

        productContainer.appendChild(productName);
        productContainer.appendChild(productPrice);
        productContainer.appendChild(productImage);
        productContainer.appendChild(addToCartButton);

        document.body.appendChild(productContainer);
    });
});
