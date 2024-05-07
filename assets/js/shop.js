
function mostrarDetalle(productoID) {
    var detallesProductos = document.querySelectorAll('.producto-detalle');
    detallesProductos.forEach(function(detalle) {
        detalle.style.display = 'none';
    });

    var detalleProducto = document.getElementById(productoID);
    detalleProducto.display = 'block';
}

var verMasBotones = document.querySelectorAll('.btn-ver-mas');

verMasBotones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        var productoID = boton.dataset.productID;
        mostrarDetalle(productoID);
    });
});
