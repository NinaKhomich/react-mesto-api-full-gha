/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const app = express();

const routes = require('./routes');
const errorProcessing = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

mongoose.connect(DB_URL);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorProcessing);

app.listen(PORT, () => {
  console.log('сервер запущен');
});
