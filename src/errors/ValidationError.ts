import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
  constructor(message = 'Validation Error') {
    super(400, message);
  }
}