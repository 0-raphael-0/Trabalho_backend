const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { connectDB } = require('../config/db');
const User = require('../models/user.model');

beforeAll(async () => {
  require('dotenv').config();
  process.env.NODE_ENV = 'test';
  await connectDB(true);        // <<< AQUI: só passa true, NÃO URI
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth routes', () => {
  test('POST /api/v1/auth/register deve criar novo usuário', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'senha123'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  test('POST /api/v1/auth/login deve autenticar usuário', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'senha123'
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /api/v1/auth/login com senha errada deve retornar 401', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'errada'
    });

    expect(res.status).toBe(401);
  });
});