const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes'); 
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const errorMiddleware = require('./middlewares/error.middleware');

dotenv.config(); 

if (process.env.NODE_ENV !== 'test') {
  connectDB(false); // usa MONGODB_DATABASE normal
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRoutes);

const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorMiddleware);

module.exports = app;
