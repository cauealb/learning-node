import 'dotenv/config'
import knex from 'knex';

if(!process.env.DATABASE_URL) {
    throw new Error('Cannot find DATABASE_URL param');
}

export const config: knex.Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: process.env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}

export const db = knex.knex(config)