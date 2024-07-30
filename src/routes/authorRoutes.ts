import { Router } from 'express';
import AuthorController from '../controllers/authorController';
// import { authorValidationRules } from '../validators/authorValidator';
// import { validate } from '../middlewares/validate';

const router = Router();

router.get('/authors', AuthorController.getAllAuthors);
router.get('/authors/:id', AuthorController.getById);
router.post('/authors',  AuthorController.create);
router.put('/authors/:id',  AuthorController.update);
router.delete('/authors/:id', AuthorController.delete);
router.get('/authors/:id/books', AuthorController.getBooksByAuthor);
router.get('/authors-with-books', AuthorController.getAllAuthorsWithBooks);
router.get('/author/:id/books', AuthorController.getAuthorWithBooks);

export default router;