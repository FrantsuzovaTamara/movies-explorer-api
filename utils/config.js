require('dotenv').config();

const {
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
  MONGO_DB,
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
  MONGO_DB: NODE_ENV === 'production' ? MONGO_DB : 'mongodb://0.0.0.0:27017/bitfilmsdb',
};
