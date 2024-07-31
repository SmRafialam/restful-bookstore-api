import { body } from 'express-validator';

export const authorValidationRules = [
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('birthdate').notEmpty().withMessage('Birthdate is required').isDate().withMessage('Birthdate must be a valid date')
];
