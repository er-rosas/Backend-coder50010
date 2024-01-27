Algunas instacias del codigo que habia dejado comentadas


Product manager:

// manager.getProducts().then(console.log);

// Para realizar el testing:

// Los fui agregando de a uno:
// manager.addProduct({ title: "Producto 1", description: "Descripción...", price: 20, thumbnail: "ruta_imagen.jpg", code: "ABC123", stock: 10 });
// manager.addProduct({ title: "Producto 2", description: "Descripción...", price: 30, thumbnail: "ruta_imagen.jpg", code: "ABC124", stock: 10 });

// manager.getProducts().then(console.log);


// manager.getProductById(1).then(console.log);

// manager.updateProduct(1, { price: 40, stock: 15 });
// manager.getProducts().then(console.log);


// manager.deleteProduct(1);
// manager.getProducts().then(console.log);



carts.router.js:

// 1. Crear un nuevo carrito (POST /api/carts/):
// Método: POST
// URL: http://localhost:8080/api/carts

// 2. Obtener un carrito por ID (GET /api/carts/:cid):
// Método: GET
// URL: http://localhost:8080/api/carts/1

// 3. Agregar un producto a un carrito (POST /api/carts/:cid/product/:pid):
// Método: POST
// URL: http://localhost:8080/api/carts/1/product/1
// Cuerpo (en formato JSON):
//  {
//     "quantity": 1
//  }



products.router.js:

// 1. Obtener todos los productos:
// Método: GET
// URL: http://localhost:8080/api/products/

// http://localhost:8080/api/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.

// 2. Obtener un producto por su ID:
// Método: GET
// URL: http://localhost:8080/api/products/{pid}

// 3. Agregar un nuevo producto:
// Método: POST
// URL: http://localhost:8080/api/products
// Cuerpo (en formato JSON):
// {
//     "title": "Producto nuevo",
//     "description": "Descripción del producto",
//     "code": "ABC123",
//     "price": 29.99,
//     "stock": 100,
//     "category": "Electrónicos",
//     "thumbnails": [
//         "url1",
//         "url2"
//     ]
// }
// 4. Actualizar un producto por su ID:
// Método: PUT
// URL: http://localhost:8080/api/products/{pid}
// Cuerpo (en formato JSON con los campos a actualizar):
// {
//     "price": 39.99,
//     "stock": 80
// }
// 5. Eliminar un producto por su ID:
// Método: DELETE
// URL: http://localhost:8080/api/products/{pid}













User
http://localhost:8080/api/users/
{
    "first_name": "fede",
    "last_name": "String",
    "email": "fede@gmial.com",
    "password": "123"
}

Product
http://localhost:8080/api/products/
{
    "title": String,
    "description": String, 
    "code": String,
    "price": Number,
    "stock": Number,
    "category": String,
    "thumbnail": "[]"
}