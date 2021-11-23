import mongoose, { Connection } from 'mongoose';

const { MONGO_URL, MONGO_DBNAME, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const options = {
  authSource: 'admin',
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = (): Connection => {
  mongoose.connect(`${MONGO_URL}/${MONGO_DBNAME}`, options);
  return mongoose.connection;
};

export default connect;
