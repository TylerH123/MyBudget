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

// test route to get all bills for owner (Tyler)
// should be empty at first
describe('GET /api/bills', () => {
	it('should return all bills for owner', async () => {
	  const res = await request(app).get('/api/bills');
	  expect(res.statusCode).toBe(200);
	  expect(res.body.length).toBe(0);
	});
});
  
let createdBillId; // Variable to store the created bill's ID
 
// test route to post a bill for owner (Tyler)
// should return the posted bill
describe('POST /api/bills', () => {
	it('should create a bill for owner', async () => {
		const res = await request(app).post('/api/bills').send({
			owner: 'Tyler',
			category: 'Food',
			subcategory: 'Grubhub',
			date: '2023-11-21T00:00:00.000+00:00',
			amount: 6.28,
			description: ''
		});
		expect(res.statusCode).toBe(201);
    	expect(res.body.category).toBe('Food');
		expect(res.body.amount).toBe(6.28);

		createdBillId = res.body._id;
	});
});

// test retrieving the posted bill for owner (Tyler)
// should return the bill that was just posted
describe('GET /api/bills/bill/:id', () => {
	it('should get the bill for owner', async () => {
		const res = await request(app).get(`/api/bills/bill/${createdBillId}`);
		expect(res.statusCode).toBe(200);
    	expect(res.body.category).toBe('Food');
		expect(res.body.amount).toBe(6.28);
	});
});

// test retrieving invalid bill for owner (Tyler)
// should return 404
describe('GET /api/bills/bill/:id', () => {
	it('should return 404', async () => {
		let id = 'test_' + createdBillId
		const res = await request(app).get(`/api/bills/bill/${id}`);
		expect(res.statusCode).toBe(404);
	});
});

//TODO: test failed authentication

// test route to delete a bill for owner (Tyler)
// should return the deleted bill
describe('DELETE /api/bills/bill/:id', () => {
	it('should delete the bill for owner', async () => {
		// Ensure that the createdBillId is defined
		expect(createdBillId).toBeDefined();

		const res = await request(app).delete(`/api/bills/bill/${createdBillId}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.category).toBe('Food');
		expect(res.body.amount).toBe(6.28);
		expect(res.body._id).toBe(createdBillId);
	});
});

