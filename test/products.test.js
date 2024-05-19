import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080')

describe('Testing de router de Products', () => {
    let productId;
    let newProductDataCreate
    let responseCreateProduct

    before(async () => {
        const newProductData = {
            title: "Producto Ejemplo",
            description: "Descripción del producto de ejemplo",
            code: "PE002",
            price: 15.99,
            stock: 50,
            category: "Electrónicos"
        };
        newProductDataCreate = newProductData
        const response = await requester.post('/api/products').send(newProductData);
        //console.log("---1---" + JSON.stringify(response));
        responseCreateProduct = response // Guardamos el ID del producto de ejemplo para usarlo en las pruebas
        const responseBody = JSON.parse(response.text);
        productId = responseBody.payload._id;
        //console.log("Producto ID:", productId);

    });

    // afterEach(async function() {
    //     await requester.delete(`/api/products/${exampleProductId}`);
    // });
    // describe('Test Product', () => {
    //     it('Testing del end point GET /api/products debe traer un producto correctamente', async () => {
            
    //     })
    // })
    // describe('GET /api/products', function() {
    //     it('Debe traer todos los productos correctamente', async function() {
    //         const response = await requester.get('/api/products');
    //         //expect(response.status).to.equal(200);
    //         expect(response.body).to.be.an('array');
    //         //console.log(response);
    //     });
    // });

    describe('Test Product', () => {
        it('Testing del end point GET /api/products debe traer un producto correctamente', async () => {
            const response = await requester.get('/api/products');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            //console.log(response.body);

            // Asegúrate de que cada elemento del array sea una instancia de Product
            // response.body.forEach(product => {
            //     expect(product).to.be.an.instanceOf(Product);
            // });
        });

        it('Testing del end point POST /api/products debe crear un producto correctamente', async () => {
            // Utilizamos el producto del before anterior, de esta forma no creamos muchos productos.
            expect(responseCreateProduct._body.payload.title).to.equal(newProductDataCreate.title);

            // const newProductData = {
            //     title: "Nuevo Producto",
            //     description: "Descripción del nuevo producto",
            //     code: "NP001",
            //     price: 20.99,
            //     stock: 100,
            //     category: "Electrónicos"
            // };
            // const response = await requester.post('/api/products').send(newProductData);
            //expect(responseCreateProduct.status).to.equal(201);
            //expect(response.body).to.be.an.instanceOf(Product);
            //console.log(responseCreateProduct._body.payload.title);
            //console.log(newProductDataCreate);
            
            // Asegúrate de agregar más expectativas según los campos esperados
        });

        it('Testing del end point GET /api/products/:pid debe obtener un producto por ID correctamente', async () => {
            const response = await requester.get(`/api/products/${productId}`);

            // Supongamos que hay un producto en la base de datos y su ID es 'exampleProductId'
            //const exampleProductId = '66414a5f8c37201838016fe2';
            //expect(response.status).to.equal(200);
            //expect(response.body).to.be.an.instanceOf(Product);

            //console.log(response.body + "  holaaaa");
            //console.log(JSON.stringify(response) + "  holaaaa");
            //const responseBody = JSON.parse(response.text);
            //console.log(responseBody);

            // productId = responseBody.payload._id;
            // console.log("Producto ID:", productId);
            //console.log(response.body._id);
            //console.log(productId);
            expect(response.body._id).to.equal(productId);
        });

        it('Testing del end point PUT /api/products/:pid debe actualizar un producto correctamente', async () => {
            // Supongamos que hay un producto en la base de datos y su ID es 'exampleProductId'
            //const exampleProductId = 'exampleProductId';
            const updatedProductData = {
                title: "Producto Actualizado",
                description: "Descripción del producto actualizado",
                price: 25.99,
                stock: 150
            };
            const response = await requester.put(`/api/products/${productId}`).send(updatedProductData);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Producto actualizado correctamente');
            // Asegúrate de agregar más expectativas según los campos esperados
        });

        it('Testing del end point DELETE /api/products/:pid debe eliminar un producto correctamente', async () => {
            // Supongamos que hay un producto en la base de datos y su ID es 'exampleProductId'
            const response = await requester.delete(`/api/products/${productId}`);
            //expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Producto eliminado correctamente');
            // Asegúrate de agregar más expectativas según los campos esperados
        });
    });
})

