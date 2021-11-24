import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import connectMongo from './database';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { router } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

connectMongo();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
