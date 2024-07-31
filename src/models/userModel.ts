import { Knex } from 'knex';
import bcrypt from 'bcrypt';

class UserModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async createUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await this.db('users').insert({ username, password: hashedPassword }).returning('*');
    return user;
  }

  async findByUsername(username: string) {
    return this.db('users').where({ username }).first();
  }
}

export default UserModel;
