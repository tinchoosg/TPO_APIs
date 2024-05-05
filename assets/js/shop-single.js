
function mostrarProducto(productID) {
    var selector = '#' + productID;

    document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
    });
}

function verProducto(productName) {
    var url = "shop-single.html#product-section-" + encodeURIComponent(productName);
    window.location.href = url;
}

var verMasBotones = document.querySelectorAll('.btn-ver-mas');

verMasBotones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        var productName = boton.dataset.productName;
        verProducto(productName);
    });
});
