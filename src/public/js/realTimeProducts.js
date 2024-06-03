const socket = io(); // Conexión con el servidor de Socket.io

    // Manejar el envío del formulario para agregar un nuevo producto
    const addProductForm = document.getElementById('addProductForm');

    //document.getElementById("owner").value =`${owner.id}`;

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
        const owner = document.getElementById('owner').value.trim();

        // Construir el objeto del nuevo producto
        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails,
            owner
        };

        // Enviar los datos del nuevo producto al servidor a través de WebSocket
        socket.emit('addProduct', newProduct);

        // Limpiar el formulario después de enviar los datos
        addProductForm.reset();
    });

    socket.on("updateProducts", (data) => {
        const productList = document.getElementById("productList");

        if (productList && Array.isArray(data.products)) {
            productList.innerHTML = "";

            // const h2 = document.createElement("h1");
            // h2.textContent = "Lista de productos:";
            // productList.appendChild(h2);

            data.products.forEach((product) => {
                const id = product._id.toString();
                const productContainer = document.createElement("div");
                productContainer.setAttribute("id", id);
                productContainer.classList.add("p-list-card");
                
                // const parametro = "id";
                // productContainer.setAttribute(parametro, id);

                const thumbnail = product.thumbnails.length > 0 ? product.thumbnails[0] : "default-thumbnail-url";

                productContainer.innerHTML = `
                    <img src="${thumbnail}" class="product-img" alt="Producto">
                    <div class="product-description">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-">ID de producto: ${id}</p>
                        <p class="product-">${product.code}</p>
                        <p class="product-">${product.description}</p>
                        <p class="product-">USD ${product.price}</p>
                        <p class="product-">Stock: ${product.stock}</p>
                    </div>
                    <button class="product-button" type="button" onclick="deleteProduct('${id}')">Eliminar (Borrado lógico)</button>
                `;

                // productContainer.innerHTML = ` 
                // <h4>${product.code}: ${product.title}</h4>
                // <p>ID de producto: ${id}</p>
                // <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
                // <p>Owner: ${product.owner}</p>
                // <button type="button" onclick="deleteProduct('${id}')">Eliminar producto</button>   
                // `;
                productList.appendChild(productContainer);
            });
        } else {
            console.log("Error: La estructura de datos de 'data' no es válida.");
        }
    });

    function deleteProduct(idProduct) {
        socket.emit("deleteProduct", { idProduct });
    }