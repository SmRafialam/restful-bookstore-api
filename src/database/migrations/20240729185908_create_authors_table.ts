// migrations/{timestamp}_create_authors_table.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("authors", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("bio");
    table.date("birthdate").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("authors");
}
