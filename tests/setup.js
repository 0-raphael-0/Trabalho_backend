require('dotenv').config();
process.env.NODE_ENV = 'test';

const { connectDB } = require('../config/db');

beforeAll(async () => {
  await connectDB(true); // usa MONGODB_DATABASE_TEST
});