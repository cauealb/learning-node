import knex from 'knex';

export const config: knex.Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: './db/app.db'
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}

export const db = knex.knex(config)