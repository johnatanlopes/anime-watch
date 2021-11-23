import 'dotenv/config';
import express from 'express';

import connectMongo from './db';

const PORT = process.env.PORT || 3000;

const app = express();

connectMongo();

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
