const socket = io(); // Conexión con el servidor de Socket.io

    // Manejar el envío del formulario para agregar un nuevo producto
    const addProductForm = document.getElementById('addProductForm');

addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

        // Obtener los valores del formulario
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const code = document.getElementById('code').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const category = document.getElementById('category').value.trim();
        const thumbnails = document.getElementById('thumbnails').value.trim().split(',');

        // Construir el objeto del nuevo producto
        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        };

        // const newProduct = {
        //     title: data.title,
        //     description: data.description,
        //     price: data.price,
        //     thumbnail: data.thumbnail,
        //     code: data.code,
        //     stock: data.stock,
        //     category: data.category
        // };

        // Enviar los datos del nuevo producto al servidor a través de WebSocket
        socket.emit('addProduct', newProduct);

        // Limpiar el formulario después de enviar los datos
        addProductForm.reset();
    });

    socket.on('updateProducts', (products) => {
        // Actualizar la lista de productos en la vista
        const productList = document.getElementById('productList');
        // productList.innerHTML = ''; // Limpiar la lista antes de agregar los productos actualizados
    
        // products.forEach(product => {
        //     const newItem = document.createElement('li');
        //     newItem.innerHTML = `
        //         <h4>${product.code}: ${product.title}</h4>
        //         <p>ID de producto: ${product.id}</p>
        //         <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
        //         <button type="button" onclick="deleteProduct('${product.id}')">Eliminar producto</button>
        //     `;
        //     productList.appendChild(newItem);
        // });
        if (productList && Array.isArray(products)) {
            productList.innerHTML = "";
            const h1 = document.createElement("h1");
            h1.textContent = "Lista de productos:";
            productList.appendChild(h1);
            products.forEach((product) => {
                const productContainer = document.createElement("div");
                productContainer.innerHTML = `      
                <h4>${product.code}: ${product.title}</h4>
                <p>ID de producto: ${product.id}</p>
                <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
                <button type="button" onclick="deleteProduct('${product.id}')">Eliminar producto</button>
            `;
                productList.appendChild(productContainer);
            });
          } //else {
        //     console.log("Error: La estructura de datos de 'data' no es válida.");
        //   }
    });

    function deleteProduct(idProduct) {
        socket.emit("deleteProduct", { idProduct });
    }
    

    // <strong>ID:</strong> ${product.id} <br>
    //             <strong>Título:</strong> ${product.title} <br>
    //             <strong>Descripción:</strong> ${product.description} <br>
    //             <button type="button" onclick="deleteProduct('${product.id}')">Eliminar producto</button>
    //             <!-- Otros detalles del producto --></br>