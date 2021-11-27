import mongoose, { Connection, ConnectOptions } from 'mongoose';

import { logger } from '../helpers/logger';

const { MONGO_URL, MONGO_DBNAME, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

type LoggerLevel = 'error' | 'warn' | 'info' | 'debug';

type ConnectOptionsExtend = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  loggerLevel: LoggerLevel;
};

const options: ConnectOptions & ConnectOptionsExtend = {
  authSource: 'admin',
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  minPoolSize: 1,
  maxPoolSize: 10,
  keepAlive: true,
  keepAliveInitialDelay: 1000,
  socketTimeoutMS: 60000,
  loggerLevel: process.env.LOG_LEVEL ? 'debug' : 'warn',
};

const connect = (): Connection => {
  mongoose.connect(`${MONGO_URL}/${MONGO_DBNAME}`, options);

  mongoose.connection.on('connected', () => logger.info('mongodb connected'));
  mongoose.connection.on('error', () => logger.error('mongodb error'));

  return mongoose.connection;
};

export default connect;
