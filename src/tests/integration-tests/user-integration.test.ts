import supertest from 'supertest';
import app from '../../app.js';

describe('UserRegister', () => {
  it('should return a successful register object', async () => {

    const response = await supertest(app).post('/user/v1/register').send({
        "email": "joseguzman@gmail.com",
        "password": "passwordlargo",
        "name": "Jose"
    })

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toBe(
      "joseguzman@gmail.com"
    );
  });
});

describe('PasswordValidation', () => {
  it('should return an error for invalid password', async () => {

    const response = await supertest(app).post('/user/v1/register').send({
        "email": "joseguzman@gmail.com",
        "password": "test",
        "name": "Jose"
    })

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.Code).toBe(1000);
    expect(response.body.Message).toBe("User entered an invalid password.");
  });
});