import { Router } from 'express';
import AuthorController from '../controllers/authorController';
import { authorValidationRules } from '../validators/authorValidator';
import { validate } from '../middlewares/validate';
// import { authorValidationRules } from '../validators/authorValidator';
// import { validate } from '../middlewares/validate';

const router = Router();

router.get('/authors', AuthorController.getAllAuthors);
router.get('/authors/:id', AuthorController.getById);
router.post('/authors', authorValidationRules, validate, AuthorController.create);
router.put('/authors/:id', authorValidationRules, validate, AuthorController.update);
router.delete('/authors/:id', AuthorController.delete);
router.get('/authors/:id/books', AuthorController.getBooksByAuthor);
router.get('/authors-with-books', AuthorController.getAllAuthorsWithBooks);

export default router;