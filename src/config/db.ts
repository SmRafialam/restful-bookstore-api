import knex from 'knex';
import knexConfig from '../../knexfile'; // Adjust the path to your knexfile

// Determine the environment (default to development if not specified)
const environment = process.env.NODE_ENV || 'development';

// Initialize Knex instance with the appropriate configuration
const db = knex(knexConfig[environment]);

export default db;
