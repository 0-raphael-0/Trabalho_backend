const mongoose = require('mongoose');

const buildMongoUri = (isTest = false) => {
  const user = encodeURIComponent(process.env.MONGODB_USER);
  const pass = encodeURIComponent(process.env.MONGODB_PASSWORD);
  const host = process.env.MONGODB_HOST;
  const dbName = isTest
    ? process.env.MONGODB_DATABASE_TEST || process.env.MONGODB_DATABASE
    : process.env.MONGODB_DATABASE;

  return `mongodb+srv://${user}:${pass}@${host}/${dbName}?retryWrites=true&w=majority&authSource=admin`;
};

const connectDB = async (isTest = false) => {
  try {
    const uri = buildMongoUri(isTest);
    await mongoose.connect(uri);
    console.log('MongoDB conectado em', uri);
  } catch (err) {
    console.error('Erro ao conectar no MongoDB', err);
    throw err;
  }
};

module.exports = { connectDB, buildMongoUri };