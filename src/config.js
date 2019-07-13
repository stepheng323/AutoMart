import pg from 'pg';
import dotenv from 'dotenv';

let config;

dotenv.config();
const production = {
  host: process.env.HEROKU_PG_HOST,
  user: process.env.HEROKU_PG_USER,
  database: process.env.HEROKU_PG_DATABASE,
  password: process.env.HEROKU_PG_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
};
const development = {
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
};
const travis = {
  host: process.env.TRAVIS_HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
};

if (process.env.NODE_ENV === 'production') {
  config = production;
} else if (process.env.NODE_ENV === 'test') {
  config = travis;
} else {
  config = development;
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log(`connected to the database ${config.database}`);
});
export default pool;
