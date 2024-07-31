import { body } from 'express-validator';

export const bookValidationRules = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a non empty string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('published_date').notEmpty().withMessage('Published date is required').isDate().withMessage('Published date must be a valid date'),
  body('author_id').notEmpty().withMessage('Author ID is required').isInt().withMessage('Author ID must be an integer'),
];
