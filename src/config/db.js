// "use strict";
// const knex = require("knex");
// const knexFile = require("../knexfile.js");
// const environment = process.env.NODE_ENV || "development";
// module.exports = knex(knexFile[environment]);
import knex from 'knex';
import knexConfig from '../../knexfile';  // Adjust the path if needed

const db = knex(knexConfig);

export default db;
