import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080')

describe('Testing del router Session', () => {
    let token;
    let testUser = {
        first_name: "Test",
        last_name: "User",
        email: `test${Math.floor(Math.random() * 100)}@example.com`,
        password: "Test@1234"
    };

    it('Testing del end point POST /api/sessions/register debe de registrar a un usuario', async () => {
        const response = await requester.post('/api/sessions/register').send(testUser);
        expect(response).to.be.ok;
    });

    it('Testing del end point POST /api/sessions/login debe de loguear a un usuario', async () => {
        const response = await requester.post('/api/sessions/login').send({
            email: testUser.email,
            password: testUser.password
        });
        expect(response).to.be.ok
        token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    });

    it('Testing del end point GET /api/sessions/current debe de brindar info del usuario logueado', async () => {
        const response = await requester.get('/api/sessions/current')
            .set('Cookie', `cookieToken=${token}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('email', testUser.email);
    });

    it('Testing del end point GET /api/sessions/logout debe desloguear a un usuario', async () => {
        const response = await requester.get('/api/sessions/logout')
            .set('Cookie', `cookieToken=${token}`);
        expect(response.status).to.equal(302);
    });
});
