import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(`Unexpected error caught: ${err.stack}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
