import request from 'supertest';
import app from '../index';

describe('Todo Endpoints', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Login para pegar o token de autenticação
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });
        token = res.body.token;
        userId = res.body.details.id;
    });

    it('should create a new to-do', async () => {
        const res = await request(app)
            .post(`/api/todo/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                todoText: 'My first to-do',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });
});

describe('Todo Endpoints', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Login para pegar o token de autenticação
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });
        token = res.body.token;
        userId = res.body.details.id;
    });

    it('should get all todos for the user', async () => {
        const res = await request(app)
            .get(`/api/todo/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('Todo Endpoints', () => {
    let token;
    let userId;
    let todoId;

    beforeAll(async () => {
        // Login para pegar o token de autenticação
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });
        token = res.body.token;
        userId = res.body.details.id;

        // Criar uma nova tarefa
        const todoRes = await request(app)
            .post(`/api/todo/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                todoText: 'Todo to delete',
            });
        todoId = todoRes.body.id;
    });

    it('should delete a todo', async () => {
        const res = await request(app)
            .delete(`/api/todo/${todoId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204); // Ou o status que você definiu para exclusão
    });
});