import { Request, Response } from 'express';
import AuthorModel from '../models/authorModel';
import BookModel from '../models/bookModel';


class AuthorController {
  static async getAllAuthors(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const authors = await AuthorModel.getAll(Number(page), Number(limit), search as string);
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching authors', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try{
      const id = Number(req.params.id);
      const author = await AuthorModel.getById(id);
      if (author) {
        res.json(author);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    }catch(error){
      res.status(500).json({ message: 'Error fetching authors', error });
    }

  }

  static async create(req: Request, res: Response): Promise<void> {
    try{
      const author = req.body;
      const ids = await AuthorModel.create(author);
      res.status(201).json({ id: ids[0] });
    }catch(error){
      console.log(error);
      res.status(500).json({ message: 'Error fetching authors', error });
    }
 
  }

  static async update(req: Request, res: Response): Promise<void> {
    try{
      const id = Number(req.params.id);
      const author = req.body;
      const updated = await AuthorModel.update(id, author);
      if (updated) {
        res.json({ message: 'Author updated' });
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    }catch(error){
      res.status(500).json({ message: 'Error fetching authors', error });

    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try{
      const id = Number(req.params.id);
      const deleted = await AuthorModel.delete(id);
      if (deleted) {
        res.json({ message: 'Author deleted' });
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    }catch(error){
      res.status(500).json({ message: 'Error fetching authors', error });

    }
    
  }
  
  static async getBooksByAuthor(req: Request, res: Response): Promise<void> {
    try{
      const authorId = Number(req.params.id);
      const books = await BookModel.getByAuthorId(authorId);
      res.json(books);
    }catch(error){
      res.status(500).json({ message: 'Error fetching authors', error });

    }
    
  }

  static async getAllAuthorsWithBooks(req: Request, res: Response): Promise<void> {
    try {
      const authorsWithBooks = await AuthorModel.getAllAuthorsWithBooks();
      res.json(authorsWithBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving authors with books', error });
    }
  }

  static async getAuthorWithBooks(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const authorWithBooks = await AuthorModel.getAuthorWithBooks(id);
      if (authorWithBooks) {
        res.json(authorWithBooks);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving author with books', error });
    }
  }
}

export default AuthorController;
