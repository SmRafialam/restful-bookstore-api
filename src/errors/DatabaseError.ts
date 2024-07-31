// src/errors/DatabaseError.ts

import { HttpError } from './HttpError';

export class DatabaseError extends HttpError {
  constructor(message = 'Database Error') {
    super(500, message);
  }
}