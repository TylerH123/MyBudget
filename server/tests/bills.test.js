const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

beforeEach(async () => {
	await mongoose.connect(process.env.MONGODB_TEST_URI);
});

afterEach(async () => {
	await mongoose.connection.close();
});

// test route to get all bills for owner (Tyler)
// should be empty at first
describe("GET /api/bills", () => {
	it("should return all bills for owner", async () => {
	  const res = await request(app).get("/api/bills");
	  expect(res.statusCode).toBe(200);
	  expect(res.body.length).toBe(0);
	});
});
  

// test route to post a bill for owner (Tyler)
// should return the posted bill
describe("POST /api/bills", () => {
	it("should create a bill for owner", async () => {
		const res = await request(app).post("/api/bills").send({
			owner: "Tyler",
			category: "Food",
			subcategory: "Grubhub",
			date: "2023-11-21T00:00:00.000+00:00",
			amount: 6.28,
			description: ""
		});
		expect(res.statusCode).toBe(201);
    	expect(res.body.category).toBe("Food");
		expect(res.body.amount).toBe(6.28);
	});
});
  