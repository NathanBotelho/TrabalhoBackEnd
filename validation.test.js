// tests/validation.test.js
const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  const res = await request(app).post('/auth/login').send({
    usuario: 'admin',
    senha: 'password'
  });
  token = res.body.token;
});

describe('Validação de Campos', () => {
  it('Nome deve ter entre 3 e 255 caracteres', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'Jo',
      sobrenome: 'Doe',
      email: 'john.doe@example.com',
      idade: 30
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);

    const res2 = await request(app).post('/clientes').send({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'john.doe@example.com',
      idade: 30
    }).set('Authorization', `Bearer ${token}`);
    expect(res2.statusCode).toEqual(201);
  });

  it('Email deve ser válido', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'john.doe',
      idade: 30
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);

    const res2 = await request(app).post('/clientes').send({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'john.doe@example.com',
      idade: 30
    }).set('Authorization', `Bearer ${token}`);
    expect(res2.statusCode).toEqual(201);
  });

  it('Idade deve ser positiva e menor que 120', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'john.doe@example.com',
      idade: -5
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);

    const res2 = await request(app).post('/clientes').send({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'john.doe@example.com',
      idade: 130
    }).set('Authorization', `Bearer ${token}`);
    expect(res2.statusCode).toEqual(400);

    const res3 = await request(app).post('/clientes').send({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'john.doe@example.com',
      idade: 30
    }).set('Authorization', `Bearer ${token}`);
    expect(res3.statusCode).toEqual(201);
  });

  it('Preço deve ser positivo', async () => {
    const res = await request(app).post('/produtos').send({
      nome: 'Produto',
      descricao: 'Descrição do produto',
      preco: -10.00,
      data_atualizado: '2023-01-01'
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);

    const res2 = await request(app).post('/produtos').send({
      nome: 'Produto',
      descricao: 'Descrição do produto',
      preco: 10.00,
      data_atualizado: '2023-01-01'
    }).set('Authorization', `Bearer ${token}`);
    expect(res2.statusCode).toEqual(201);
  });

  it('Data deve ser válida entre 1 de Janeiro de 2000 e 20 de Junho de 2024', async () => {
    const res = await request(app).post('/produtos').send({
      nome: 'Produto',
      descricao: 'Descrição do produto',
      preco: 10.00,
      data_atualizado: '1999-12-31'
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);

    const res2 = await request(app).post('/produtos').send({
      nome: 'Produto',
      descricao: 'Descrição do produto',
      preco: 10.00,
      data_atualizado: '2025-01-01'
    }).set('Authorization', `Bearer ${token}`);
    expect(res2.statusCode).toEqual(400);

    const res3 = await request(app).post('/produtos').send({
      nome: 'Produto',
      descricao: 'Descrição do produto',
      preco: 10.00,
      data_atualizado: '2023-01-01'
    }).set('Authorization', `Bearer ${token}`);
    expect(res3.statusCode).toEqual(201);
  });
});