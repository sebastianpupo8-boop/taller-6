var urlAPI = 'https://dummyjson.com'
var listaProductos = []

/* ---------- INDEX: lista de productos ---------- */

function extraerProductos() {

    let endPoint = urlAPI + "/products?limit=20"

    console.info(endPoint)

    fetch(endPoint)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {

            listaProductos = respuestaJSON.products
            mostrarProductos(listaProductos)

        }
    )
    .catch(error => console.error('Error al consultar la API:', error))

}

function mostrarProductos(productos) {

    let divPadre = document.getElementById("gridContainer")
    divPadre.innerHTML = ''

    if (productos.length === 0) {
        let pVacio = crearNodoConTexto('p', 'No se encontraron productos.')
        pVacio.classList.add('mensajeVacio')
        adicionarElementoAContenedor(pVacio, divPadre)
        return
    }

    productos.forEach(producto => {

        let divProducto = crearDivProducto(producto)
        adicionarElementoAContenedor(divProducto, divPadre)

    });
}

function crearDivProducto(producto) {

    let div = crearElemento('div')
    div.classList.add('colorDivHijo')

    // Imagen del producto
    let divImagen = crearElemento('div')
    divImagen.classList.add('contenedorImagen')
    let imagenProducto = crearImagen(producto.thumbnail, producto.title)
    imagenProducto.classList.add('tamanoImagen', 'puntero')
    imagenProducto.addEventListener("click", function () {

        window.location.href = 'producto.html?id=' + producto.id

    })
    adicionarElementoAContenedor(imagenProducto, divImagen)
    adicionarElementoAContenedor(divImagen, div)

    // Información
    let divInfo = crearElemento('div')
    divInfo.classList.add('infoProducto')

    let pCategoria = crearNodoConTexto('p', producto.category)
    pCategoria.classList.add('categoria')
    adicionarElementoAContenedor(pCategoria, divInfo)

    let pNombre = crearNodoConTexto('p', producto.title)
    pNombre.classList.add('colorLetraTitulo', 'nombreProducto')
    adicionarElementoAContenedor(pNombre, divInfo)

    let divPrecioRating = crearElemento('div')
    divPrecioRating.classList.add('filaPrecio')

    let pPrecio = crearNodoConTexto('p', '$' + producto.price)
    pPrecio.classList.add('precio')
    adicionarElementoAContenedor(pPrecio, divPrecioRating)

    let pRating = crearNodoConTexto('p', '★ ' + producto.rating)
    pRating.classList.add('rating')
    adicionarElementoAContenedor(pRating, divPrecioRating)

    adicionarElementoAContenedor(divPrecioRating, divInfo)

    let pStock = crearNodoConTexto('p', 'Stock: ' + producto.stock)
    pStock.classList.add('colorLetraGeneral')
    adicionarElementoAContenedor(pStock, divInfo)

    let boton = crearNodoConTexto('button', 'Ver producto')
    boton.classList.add('boton', 'puntero')
    boton.addEventListener("click", function () {

        window.location.href = 'producto.html?id=' + producto.id

    })
    adicionarElementoAContenedor(boton, divInfo)

    adicionarElementoAContenedor(divInfo, div)

    return div
}

function buscarProducto() {

    let texto = document.getElementById('buscador').value.toLowerCase().trim()

    let filtrados = listaProductos.filter(producto =>
        producto.title.toLowerCase().includes(texto) ||
        producto.category.toLowerCase().includes(texto)
    )

    mostrarProductos(filtrados)
}

/* ---------- PRODUCTO: detalle ---------- */

function extraerDatosProducto(idProducto) {

    let endPoint = urlAPI + "/products/" + idProducto

    console.info(endPoint)

    fetch(endPoint)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {

            mostrarDatosProducto(respuestaJSON)

        }
    )
    .catch(error => console.error('Error al consultar la API:', error))

}

function mostrarDatosProducto(producto) {

    let imagen = document.getElementById('imagenProducto')
    imagen.src = producto.images[0]
    imagen.alt = producto.title

    document.getElementById('categoria').textContent = producto.category
    document.getElementById('nombre').textContent = producto.title
    document.getElementById('precio').textContent = '$' + producto.price
    document.getElementById('descripcion').textContent = producto.description
    document.getElementById('rating').textContent = '★ ' + producto.rating
    document.getElementById('stock').textContent = producto.stock
    document.getElementById('marca').textContent = producto.brand ? producto.brand : 'Sin marca'
    document.getElementById('descuento').textContent = producto.discountPercentage + '%'

}

/* ---------- Funciones auxiliares ---------- */

function crearElemento(tag) {
    let nodo = document.createElement(tag)
    nodo.classList.add('colorLetra')
    return nodo
}

function crearNodoConTexto(tag, texto) {
    let nodo = crearElemento(tag)
    nodo.textContent = texto
    return nodo
}

function adicionarElementoABody(elemento) {
    document.body.appendChild(elemento)
}

function adicionarElementoAContenedor(elemento, contenedor) {
    contenedor.appendChild(elemento)
}

function crearImagen(src, alt) {

    let nodo = crearElemento('img')
    nodo.src = src
    nodo.alt = alt
    return nodo

}
