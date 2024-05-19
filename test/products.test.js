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
        responseCreateProduct = response // Guardamos el ID del producto de ejemplo para usarlo en las pruebas
        const responseBody = JSON.parse(response.text);
        productId = responseBody.payload._id;
    });

    describe('Test Product', () => {
        it('Testing del end point GET /api/products debe traer un producto correctamente', async () => {
            const response = await requester.get('/api/products');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });

        it('Testing del end point POST /api/products debe crear un producto correctamente', async () => {
            // Utilizamos el producto del before anterior, de esta forma no creamos muchos productos.
            expect(responseCreateProduct._body.payload.title).to.equal(newProductDataCreate.title);
        });

        it('Testing del end point GET /api/products/:pid debe obtener un producto por ID correctamente', async () => {
            const response = await requester.get(`/api/products/${productId}`);
            expect(response.body._id).to.equal(productId);
        });

        it('Testing del end point PUT /api/products/:pid debe actualizar un producto correctamente', async () => {
            const updatedProductData = {
                title: "Producto Actualizado",
                description: "Descripción del producto actualizado",
                price: 25.99,
                stock: 150
            };
            const response = await requester.put(`/api/products/${productId}`).send(updatedProductData);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Producto actualizado correctamente');
        });

        it('Testing del end point DELETE /api/products/:pid debe eliminar un producto correctamente', async () => {
            const response = await requester.delete(`/api/products/${productId}`);
            expect(response.body).to.have.property('message', 'Producto eliminado correctamente');
        });
    });
})

