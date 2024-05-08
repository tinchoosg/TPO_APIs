class Producto {
    constructor(titulo, descripcion, precio, imagenes, categoria, disponibilidad) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenes = imagenes;
        this.categoria = categoria;
        this.disponibilidad = disponibilidad;
    }

    // getters y setters
    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getPrecio() {
        return this.precio;
    }

    setPrecio(precio) {
        this.precio = precio;
    }

    getImagenes() {
        return this.imagenes;
    }

    setImagenes(imagenes) {
        this.imagenes = imagenes;
    }

    getCategoria() {
        return this.categoria;
    }

    setCategoria(categoria) {
        this.categoria = categoria;
    }

    getDisponibilidad() {
        return this.disponibilidad;
    }

    setDisponibilidad(disponibilidad) {
        this.disponibilidad = disponibilidad;
    }
    
}