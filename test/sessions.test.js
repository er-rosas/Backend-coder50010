import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080')

describe('Testing del router Session', () => {
    let token;
    //let resetToken;
    let testUser = {
        first_name: "Test",
        last_name: "User",
        email: `test${Math.floor(Math.random() * 100)}@example.com`,
        password: "Test@1234"
    };

    it('Testing del end point POST /api/sessions/register debe de registrar a un usuario', async () => {
        const response = await requester.post('/api/sessions/register').send(testUser);
        //expect(response.status).to.equal(302); // Assuming a redirect happens after registration
        //console.log(response);
        expect(response).to.be.ok;
    });

    it('Testing del end point POST /api/sessions/login debe de loguear a un usuario', async () => {
        const response = await requester.post('/api/sessions/login').send({
            email: testUser.email,
            password: testUser.password
        });
        //expect(response.status).to.equal(302);
        expect(response).to.be.ok
        token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    });

    it('Testing del end point GET /api/sessions/current debe de brindar info del usuario logueado', async () => {
        const response = await requester.get('/api/sessions/current')
            .set('Cookie', `cookieToken=${token}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('email', testUser.email);
        console.log(response.body);
    });

    it('Testing del end point GET /api/sessions/logout debe desloguear a un usuario', async () => {
        const response = await requester.get('/api/sessions/logout')
            .set('Cookie', `cookieToken=${token}`);
        expect(response.status).to.equal(302); // Assuming a redirect happens after logout
    });

    // it('should request a password reset', async () => {
    //     const response = await requester.post('/api/sessions/forgot-password').send({
    //         email: testUser.email
    //     });
    //     expect(response.status).to.equal(200);
    //     // Assuming your email service provides a way to access the token, store it in resetToken for the next test
    //     resetToken = extractTokenFromEmail(); // Implement this function according to your setup
    // });

    // it('should reset the password with the token', async () => {
    //     const newPassword = "NewTest@1234";
    //     const response = await requester.post('/api/sessions/reset-password').send({
    //         passwordNew: newPassword,
    //         passwordConfirm: newPassword,
    //         token: resetToken
    //     });
    //     expect(response.status).to.equal(200);

    //     // Verify login with the new password
    //     const loginResponse = await requester.post('/api/sessions/login').send({
    //         email: testUser.email,
    //         password: newPassword
    //     });
    //     expect(loginResponse.status).to.equal(302); // Assuming a redirect happens after login
    //});
});
