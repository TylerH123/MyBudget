const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

require('dotenv').config();
const ADMIN_PASS = process.env.ADMIN_PASS;

beforeEach(async () => {
	await mongoose.connect(process.env.MONGODB_TEST_URI);
});

afterEach(async () => {
	await mongoose.connection.close();
});

// test route to get all bills for owner (Tyler)
// should be empty at first
describe('GET /api/bills/2023', () => {
	it('should return all bills for owner', async () => {
		const res = await request(app).get('/api/bills/2023');
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(0);
	});
});
  
let createdBillId; // Variable to store the created bill's ID
 
// test route to post a bill for owner (Tyler)
// should return the posted bill
describe('POST /api/bills/2023', () => {
	it('should create a bill for owner', async () => {
		const res = await request(app).post('/api/bills/2023').send({
			owner: 'Tyler',
			category: 'Food',
			subcategory: 'Grubhub',
			date: '2023-11-21T00:00:00.000+00:00',
			amount: 628,
			description: ''
		});
		expect(res.statusCode).toBe(201);
    	expect(res.body.category).toBe('Food');
		expect(res.body.amount).toBe(628);

		createdBillId = res.body._id;
	});
});

// test retrieving the posted bill for owner (Tyler)
// should return the bill that was just posted
describe('GET /api/bills/2023/bill/:id', () => {
	it('should get the bill for owner', async () => {
		const res = await request(app).get(`/api/bills/2023/bill/${createdBillId}`);
		expect(res.statusCode).toBe(200);
    	expect(res.body.category).toBe('Food');
		expect(res.body.amount).toBe(628);
	});
});

// test retrieving invalid bill for owner (Tyler)
// should return 404
describe('GET /api/bills/2023/bill/:id', () => {
	it('should return 404', async () => {
		let id = 'test_' + createdBillId
		const res = await request(app).get(`/api/bills/2023/bill/${id}`);
		expect(res.statusCode).toBe(404);
	});
});

//TODO: test failed authentication

// test route to delete a bill for owner (Tyler)
// should return the deleted bill
describe('DELETE /api/bills/2023/bill/:id', () => {
	it('should delete the bill for owner', async () => {
		// Ensure that the createdBillId is defined
		expect(createdBillId).toBeDefined();

		const res = await request(app).delete(`/api/bills/2023/bill/${createdBillId}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.category).toBe('Food');
		expect(res.body.amount).toBe(628);
		expect(res.body._id).toBe(createdBillId);
	});
});

// test route to get all bills for specific category
// should be 2 entries
describe('GET /api/bills/2023/:category', () => {
	it('should return 2 bills for food category', async () => {
		// populate table to test if categories work
		await request(app).post('/api/bills/2023').send({
			owner: 'Tyler',
			category: 'Subscription',
			subcategory: 'Grubhub',
			date: '2023-11-21T00:00:00.000+00:00',
			amount: 5,
			description: ''
		});
		
		await request(app).post('/api/bills/2023').send({
			owner: 'Tyler',
			category: 'Food',
			subcategory: 'Grubhub',
			date: '2023-11-24T00:00:00.000+00:00',
			amount: 10,
			description: ''
		});
		
		await request(app).post('/api/bills/2023').send({
			owner: 'Tyler',
			category: 'Food',
			subcategory: 'ice cream',
			date: '2023-11-22T00:00:00.000+00:00',
			amount: 1280,
			description: ''
		});

		const res = await request(app).get('/api/bills/2023/Food');
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBe(2);
		expect(res.body[0].amount).toBe(10);
		expect(res.body[1].amount).toBe(1280);
	});
});

// test route to reset db
// should return message saying deletion successful
describe('DELETE /api/bills/2023/all', () => {
	it('should delete all bill and return success message', async () => {
		// Ensure that the createdBillId is defined

		const res = await request(app).delete(`/api/bills/2023/all`).send({
			pass: ADMIN_PASS
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe("2023 successfully reset");
	});
});
