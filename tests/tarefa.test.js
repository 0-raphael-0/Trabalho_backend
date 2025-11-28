const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { connectDB } = require('../config/db');
const User = require('../models/user.model');
const Tarefa = require('../models/tarefa.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  require('dotenv').config();
  process.env.NODE_ENV = 'test';
  await connectDB(true);          // <<< AQUI TAMBÉM: boolean, não URI
  await User.deleteMany({});
  await Tarefa.deleteMany({});

  const passwordHash = await bcrypt.hash('senha123', 10);
  const user = await User.create({
    name: 'Task User',
    email: 'taskuser@example.com',
    passwordHash
  });

  token = jwt.sign(
    {},
    process.env.JWT_SECRET,
    {
      subject: String(user._id),
      expiresIn: process.env.JWT_EXPIRES || '1h'
    }
  );
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Tarefa routes', () => {
  test('POST /api/v1/tarefas deve criar tarefa', async () => {
    const res = await request(app)
      .post('/api/v1/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Minha tarefa',
        status: 'pendente'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('titulo', 'Minha tarefa');
  });

  test('GET /api/v1/tarefas deve listar tarefas do usuário', async () => {
    const res = await request(app)
      .get('/api/v1/tarefas')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/v1/tarefas sem título deve retornar 400', async () => {
    const res = await request(app)
      .post('/api/v1/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        descricao: 'Sem título'
      });

    expect(res.status).toBe(400);
  });

  test('GET /api/v1/tarefas sem token deve retornar 401', async () => {
    const res = await request(app).get('/api/v1/tarefas');

    expect(res.status).toBe(401);
  });
});