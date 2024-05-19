import { expect } from "chai";
import supertest from "supertest";
//import { app } from '../src/app.js'

const requester = supertest('http://localhost:8080')
//const requester = supertest(app);

describe('Testing de router de Carts', () => {
    //let cartId;
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
        //console.log("---1---" + JSON.stringify(response));
        //console.log(response);
        productId = response._body.payload._id
        console.log(productId);
    });

    describe('Test Cart', () => {
        let cartId;

        it('Testing del end point POST /api/carts/ debe crear un cart', async () => {

            const numE = Math.floor(Math.random() * 100);
            const testEmail = {
                email: `testEmail${numE}@gmail.com`
            };
            const response = await requester.post('/api/carts').send(testEmail);
            console.log(response._body);
            console.log(response._body.payload._id);
            cartId = response._body.payload._id;
            //prodArrayBefore = response._body.payload.products;
            expect(response._body.payload.userEmail).to.be.equal(testEmail.email);
        });

        it('Testing del end point GET /api/carts/:cid debe obtener un cart por ID correctamente', async () => {
            //const response = await requester.get(`/api/carts/6643b769bd2968c121c174c2`);
            const response = await requester.get(`/api/carts/${cartId}`);
            //console.log(response.body.payload._id);
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
            //const response = await requester.put(`/api/carts/6643b769bd2968c121c174c2`).send(productArray);
            const response = await requester.put(`/api/carts/${cartId}`).send(productArray);
            console.log(response.body);
            //prodArrayBefore = response._body.payload.products;
            //expect(response.body.payload.products).to.not.equal(prodArrayBefore);
            //expect(response.body.payload.products).to.have.property('product', '0000000000000000000000a2');
            expect(response.body.payload.products).to.be.an('array').that.is.not.empty;
        });

        it('Testing del end point DELETE /api/carts/:cid debe eliminar todos los productos del carrito', async () => {
            //const response = await requester.delete(`/api/carts/6643b769bd2968c121c174c2`);
            //console.log(cartId + "   -------------");
            //const response = await requester.delete(`/api/carts/${cartId}`);
            const response = await requester.delete(`/api/carts/${cartId}`);
            console.log(response.body);
            expect(response.body.payload.products).to.deep.equal([]);
        });
        
        it('Testing del end point POST /api/carts/:cid/product/:pid debe agregar un producto a un carrito', async () => {
            //const response = await requester.post(`/api/carts/6643b769bd2968c121c174c2/product/664188d62c56018dd54d6950`);
            const response = await requester.post(`/api/carts/${cartId}/product/${productId}`);
            //const response = await requester.post(`/api/carts/${cartId}/product/0000000000000000000000a1`);
            console.log(response._body.payload);
            //expect(response._body.payload.products[0]).to.have.property('product', '664188d62c56018dd54d6950');
            expect(response._body.payload.products[0]).to.have.property('product', `${productId}`);
            //expect(response._body.payload.products[0]).to.have.property('product', `0000000000000000000000a1`);
        });

        it('Testing del end point PUT /api/carts/:cid/product/:pid debe actualizar la cantidad de un producto en el carrito', async () => {
            const quantity = {
                quantity: 3
                }
            //const response = await requester.put(`/api/carts/6643b769bd2968c121c174c2/product/664188d62c56018dd54d6950`).send(quantity);
            const response = await requester.put(`/api/carts/${cartId}/product/${productId}`).send(quantity);
            //const response = await requester.put(`/api/carts/${cartId}/product/0000000000000000000000a1`).send(quantity);
            // id 664188d62c56018dd54d6950 // antes se rompia
            console.log(response._body);
            expect(response.body.payload.products[0]).to.have.property('quantity', 3);
        });

        it('Testing del end point PUT /api/carts/:cid/product/:pid debe eliminar un producto del carrito', async () => {
            //const response = await requester.delete(`/api/carts/6643b769bd2968c121c174c2/product/664188d62c56018dd54d6950`);
            const response = await requester.delete(`/api/carts/${cartId}/product/${productId}`);
            console.log(response._body);
            //expect(response.body.payload.products).to.be.have.p('product', "664188d62c56018dd54d6950");
            expect(response.body.payload.products).to.be.an('array').that.is.empty;
        });
    });
})

