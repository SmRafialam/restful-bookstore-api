import knex from 'knex';
import config from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const connection = knex(config[environment]);

connection.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err: any) => {
    console.error('Database connection failed:', err);
  });

export default connection;
