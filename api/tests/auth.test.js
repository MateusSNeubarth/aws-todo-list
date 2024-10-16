const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should not register a user with an existing email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser2',
                email: 'testuser@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(400); // Ou o status que você definiu para esse erro
        expect(res.body).toHaveProperty('error');
    });
});

describe('Auth Endpoints', () => {
    it('should log in an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not log in with wrong credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'wrongpassword',
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
    });
});