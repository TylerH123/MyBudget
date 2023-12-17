const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

require('dotenv').config();

beforeEach(async () => {
	await mongoose.connect(process.env.MONGODB_TEST_URI);
});

afterEach(async () => {
	await mongoose.connection.close();
});

// test route to create new user
describe('POST /api/users/signup', () => {
	it('should return email and token for created user', async () => {
		const res = await request(app).post('/api/users/signup').send({
			email: 'test123@test.com',
			password: 'S5b71,[snR"I'
		});
		expect(res.statusCode).toBe(201);
		expect(res.body.email).toBe('test123@test.com');
	});
});

// test route to log in user
describe('POST /api/users/login', () => {
	it('should return email and token for created user', async () => {
		const res = await request(app).post('/api/users/login').send({
			email: 'test123@test.com',
			password: 'S5b71,[snR"I'
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.email).toBe('test123@test.com');
	});
});