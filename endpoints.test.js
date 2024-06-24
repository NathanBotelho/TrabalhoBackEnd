// tests/endpoints.test.js
const request = require('supertest');
const app = require('../app');
const pool = require('../configs/db'); // Importar o pool de conexões

let server;
let token;

beforeAll((done) => {
  server = app.listen(done);
});

afterAll(async () => {
  await pool.end(); // Fechar a conexão com o banco de dados
  server.close(); // Fechar o servidor Express
});

describe('Testes de Endpoints', () => {
  it('POST /auth/login deve retornar um token', async () => {
    const res = await request(app).post('/auth/login').send({
      usuario: 'admin',
      senha: 'password'
    });
    expect(res.statusCode).toEqual(200);
    token = res.body.token;
    expect(token).toBeDefined();
  });

  it('GET /clientes deve falhar sem token', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toEqual(401);
  });

  it('GET /clientes deve funcionar com token', async () => {
    const res = await request(app).get('/clientes').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('GET /clientes deve retornar 200', async () => {
    const res = await request(app).get('/clientes').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('POST /clientes deve retornar 201', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'john.doe@example.com',
      idade: 30
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(201);
  });

  // Adicione mais testes conforme necessário
});