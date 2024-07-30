import express from 'express';
// import authorRoutes from './routes/authorRoutes';
// import bookRoutes from './routes/bookRoutes';
// import { errorHandler } from './middlewares/errorHandler';
import dotenv from 'dotenv';
import Knex from 'knex';
import knexConfig from '../knexfile';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use('/api', authorRoutes);
// app.use('/api', bookRoutes);

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const env = process.env.NODE_ENV || 'development';
const configOptions = knexConfig[env];

const knex = Knex(configOptions);

export default knex;