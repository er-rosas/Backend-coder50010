const socket = io(); // Conexión con el servidor de Socket.io

    // Manejar el envío del formulario para agregar un nuevo producto
    document.getElementById('addProductForm').addEventListener('submit', function(event) {
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

        // Enviar los datos del nuevo producto al servidor a través de WebSocket
        socket.emit('addProduct', newProduct);

        // Limpiar el formulario después de enviar los datos
        this.reset();
    });

    // Manejar la recepción de un nuevo producto desde el servidor
    socket.on('addProduct', function(product) {
        // Agregar el nuevo producto a la lista en la vista
        const productList = document.getElementById('productList');
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            <strong>ID:</strong> ${product.id} <br>
            <strong>Título:</strong> ${product.title} <br>
            <strong>Descripción:</strong> ${product.description} <br>
            <!-- Otros detalles del producto -->
        `;
        productList.appendChild(newItem);
    });