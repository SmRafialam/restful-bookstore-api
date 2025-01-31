import knex from 'knex';
import db from '../database/db';

interface Book {
  id?: number;
  title: string;
  description?: string;
  published_date: string;
  author_id: number;
}

class BookModel {

  static async getAll(page: number, limit: number, search: string): Promise<any> {
    const offset = (page - 1) * limit;
    const query = `%${search}%`;

    const books = await db('books')
      .where('title', 'like', query)
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db('books')
      .where('title', 'like', query)
      .count({ count: '*' });

    // Convert count to number after type assertion
    return { books, total: parseInt(count as string, 10), page, limit };
  }

  static async getById(id: number): Promise<Book> {
    return db('books').where({ id }).first();
  }

  static async create(book: Book): Promise<number[]> {
    return db('books').insert(book);
  }

  static async update(id: number, book: Book): Promise<number> {
    return db('books').where({ id }).update(book);
  }

  static async delete(id: number): Promise<number> {
    return db('books').where({ id }).del();
  }

  static async getByAuthorId(authorId: number) {
    return db('books').where('author_id', authorId).select();
  }

  static async getBookWithAuthor(authorId: number): Promise<any> {
    return db('books').where('author_id', authorId).select();
  }
}

export default BookModel;
