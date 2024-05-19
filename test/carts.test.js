import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080')

describe('Testing de router de Carts', () => {
    let productId;

    before(async () => {
        const newProductData = {
            title: "Producto Ejemplo",
            description: "Descripción del producto de ejemplo",
            code: "PE002",
            price: 15.99,
            stock: 50,
            category: "Electrónicos"
        };

        const response = await requester.post('/api/products').send(newProductData);
        productId = response._body.payload._id
    });

    describe('Test Cart', () => {
        let cartId;

        it('Testing del end point POST /api/carts/ debe crear un cart', async () => {

            const numE = Math.floor(Math.random() * 100);
            const testEmail = {
                email: `testEmail${numE}@gmail.com`
            };
            const response = await requester.post('/api/carts').send(testEmail);
            cartId = response._body.payload._id;
            expect(response._body.payload.userEmail).to.be.equal(testEmail.email);
        });

        it('Testing del end point GET /api/carts/:cid debe obtener un cart por ID correctamente', async () => {
            const response = await requester.get(`/api/carts/${cartId}`);
            console.log(response.body);
            expect(response.body.payload._id).to.equal(cartId);
        });

        it('Testing del end point PUT /api/carts/:cid debe atualizar el carrito con un arreglo de productos', async () => {
            const productArray = {
                products: [
                    { _id: '0000000000000000000000a1', product: '0000000000000000000000a2', quantity: 2 },
                    { _id: '0000000000000000000000b1',product: '0000000000000000000000b2', quantity: 1 }
                ]
            };
            const response = await requester.put(`/api/carts/${cartId}`).send(productArray);
            expect(response.body.payload.products).to.be.an('array').that.is.not.empty;
        });

        it('Testing del end point DELETE /api/carts/:cid debe eliminar todos los productos del carrito', async () => {
            const response = await requester.delete(`/api/carts/${cartId}`);
            expect(response.body.payload.products).to.deep.equal([]);
        });
        
        it('Testing del end point POST /api/carts/:cid/product/:pid debe agregar un producto a un carrito', async () => {
            const response = await requester.post(`/api/carts/${cartId}/product/${productId}`);
            expect(response._body.payload.products[0]).to.have.property('product', `${productId}`);
        });

        it('Testing del end point PUT /api/carts/:cid/product/:pid debe actualizar la cantidad de un producto en el carrito', async () => {
            const quantity = {
                quantity: 3
                };
            const response = await requester.put(`/api/carts/${cartId}/product/${productId}`).send(quantity);
            expect(response.body.payload.products[0]).to.have.property('quantity', 3);
        });

        it('Testing del end point PUT /api/carts/:cid/product/:pid debe eliminar un producto del carrito', async () => {
            const response = await requester.delete(`/api/carts/${cartId}/product/${productId}`);
            expect(response.body.payload.products).to.be.an('array').that.is.empty;
        });
    });
})

