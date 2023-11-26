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
  