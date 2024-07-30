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
  // static async getAll(): Promise<Book[]> {
  //   return db('books').select('*');
  // }

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
    return knex('books').where('author_id', authorId);
  }

  static async getBookWithAuthor(id: number): Promise<any> {
    return db('books')
      .leftJoin('authors', 'books.author_id', 'authors.id')
      .select(
        'books.id as book_id',
        'books.title as book_title',
        'books.published_date',
        'authors.id as author_id',
        'authors.name as author_name',
        'authors.birthdate'
      )
      .where('books.id', id);
  }
}

export default BookModel;
