import knex from 'knex';
import db from '../database/db';

interface Author {
  id?: number;
  name: string;
  bio?: string;
  birthdate: string;
}
// const db = knex(config.development); // Adjust according to your environment


class AuthorModel {
  // static async getAll(): Promise<Author[]> {
  //   return db('authors').select('*');
  // }
  static async getAll(page: number, limit: number, search: string): Promise<any> {
    const offset = (page - 1) * limit;
    const query = `%${search}%`;

    const authors = await db('authors')
      .where('name', 'like', query)
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db('authors')
      .where('name', 'like', query)
      .count({ count: '*' });

    return { authors, total: parseInt(count as string, 10), page, limit };
  }

  static async getById(id: number): Promise<Author> {
    return db('authors').where({ id }).first();
  }

  static async create(author: Author): Promise<number[]> {
    return db('authors').insert(author);
  }

  static async update(id: number, author: Author): Promise<number> {
    return db('authors').where({ id }).update(author);
  }

  static async delete(id: number): Promise<number> {
    return db('authors').where({ id }).del();
  }

  static async getAllAuthorsWithBooks(): Promise<any> {
    return db('authors')
      .leftJoin('books', 'authors.id', 'books.author_id')
      .select(
        'authors.id as author_id',
        'authors.name as author_name',
        'authors.birthdate',
        'books.id as book_id',
        'books.title as book_title',
        'books.published_date'
      );
  }

  static async getAuthorWithBooks(id: number): Promise<any> {
    return db('authors')
      .leftJoin('books', 'authors.id', 'books.author_id')
      .select(
        'authors.id as author_id',
        'authors.name as author_name',
        'authors.birthdate',
        'books.id as book_id',
        'books.title as book_title',
        'books.published_date'
      )
      .where('authors.id', id);
  }
}

export default AuthorModel;
