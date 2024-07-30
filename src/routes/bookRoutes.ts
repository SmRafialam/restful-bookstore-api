// src/routes/bookRoutes.ts
import { Router } from 'express';
import BookController from '../controllers/bookController';
// import { authorValidationRules } from '../validators/authorValidator';
// import { validate } from '../middlewares/validate';
// import { bookValidationRules } from '../validators/bookValidator';


const router = Router();

router.get('/books', BookController.getAllBooks);
router.get('/books/:id', BookController.getBookById);
router.post('/books', BookController.createBook);
router.put('/books/:id', BookController.updateBookById);
router.delete('/books/:id', BookController.deleteBookById);
router.get('/books/author/:id', BookController.getBooksByAuthor);
router.get('/book/:id/author', BookController.getBookWithAuthor);

export default router;
