import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import connectMongo from './database';
import { errorHandler } from './middlewares/errorHandlerMiddleware';

const PORT = process.env.PORT || 3000;

const app = express();

connectMongo();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
