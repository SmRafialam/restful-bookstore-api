import { Request, Response } from 'express';
import BookModel from '../models/bookModel';

class BookController {
  static async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const books = await BookModel.getAll(Number(page), Number(limit), search as string);
      res.json(books);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Error fetching books', error });
    }
  }

  static async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const book = await BookModel.getById(id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book', error });
    }
  }

  static async createBook(req: Request, res: Response): Promise<void> {
    try {
      const book = req.body;
      const ids = await BookModel.create(book);
      res.status(201).json({ id: ids[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating book', error });
    }
  }

  static async updateBookById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const book = req.body;
      const updated = await BookModel.update(id, book);
      if (updated) {
        res.json({ message: 'Book updated' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating book', error });
    }
  }

  static async deleteBookById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await BookModel.delete(id);
      if (deleted) {
        res.json({ message: 'Book deleted' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting book', error });
    }
  }

  static async getBooksByAuthor(req: Request, res: Response): Promise<void> {
    const authorId = Number(req.params.id);
    const books = await BookModel.getByAuthorId(authorId);
    res.json(books);
  }

  static async getBookWithAuthor(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const bookWithAuthor = await BookModel.getBookWithAuthor(id);
      if (bookWithAuthor) {
        res.json(bookWithAuthor);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving book with author', error });
    }
  }
  
}

export default BookController;
