window.onload = () => {
    getProductos();
}

const getProductos = async () => {
    await fetch('https://dummyjson.com/products')
    .then( ( respuesta ) => respuesta.json() )
    .then( ({ products }) => {
        console.log( products );

        tarjetaProductos( products );
    }).catch( ( error ) => {
        console.log( error );
    })
}

const tarjetaProductos = ( productos = [] ) => {

    let htmlCardProductos = '';

    productos.forEach( ({ id, thumbnail, title, category, brand, price, stock }) => {
        htmlCardProductos += `
            <div class="col-md-4 col-lg-3 p-2">
                <div class="card">
                    <img src="${thumbnail}" class="card-img-top" alt="${title}" />
                    <div class="card-body">
                        <h4 class="card-title">${title}</h4>
                        <h5 class="card-subtitle">${category}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Marca: </b> ${brand}</li>
                            <li class="list-group-item"><b>Precio: </b> $${price}</li>
                            <li class="list-group-item"><b>Stock: </b> ${stock}</li>
                        </ul>
                        <button class="btn btn-primary" onclick="getProducto('${id}')" data-bs-toggle="modal" data-bs-target="#productoModal">Ver Producto</button>
                    </div>
                </div>
            </div>
        `;
    });


    const nodoProductos = document.getElementById('productos');
    nodoProductos.innerHTML = htmlCardProductos;
}


const getProducto = async ( id ) => {
    await fetch(`https://dummyjson.com/products/${id}`)
    .then( ( respuesta ) => respuesta.json() )
    .then( ( data ) => {
        console.log( data );
        showProducto( data );

    }).catch( ( error ) => {
        console.log( error );
    })
}

const showProducto = ( producto ) => {

    const nodoImage = document.querySelector('#productoModal img');
    nodoImage.src = producto.thumbnail;

    const nodoTitle = document.querySelector('#productoModal .card-body h4');
    nodoTitle.textContent = producto.title;

    const nodoSubtitle = document.querySelector('#productoModal .card-body .card-subtitle');
    nodoSubtitle.textContent = producto.availabilityStatus;

    const nodoDescripcion = document.querySelector('#productoModal .card-body p');
    nodoDescripcion.textContent = producto.description;

    document.getElementById('categoria').textContent = producto.category;
    document.getElementById('marca').textContent = producto.brand;
    document.getElementById('precio').textContent = producto.price;
    document.getElementById('stock').textContent = producto.stock;
    document.getElementById('descuento').textContent = producto.discountPercentage;

    showImagesCarousel( producto.images );
}

const showImagesCarousel = ( imagenes = [] ) => {

    let htmlImages = '';

    imagenes.forEach( ( imagen, index ) => {
        htmlImages += `
            <div class="carousel-item ${ (index === 0) && 'active' } ">
                <img src="${ imagen }" class="d-block w-100" alt="...">
            </div>
        `;
    });

    const nodoCarousel = document.querySelector('#carousel .carousel-inner');
    nodoCarousel.innerHTML = htmlImages;

    const myCarouselElement = document.querySelector('#carousel')

    const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 2000,
    touch: false
    })
}
