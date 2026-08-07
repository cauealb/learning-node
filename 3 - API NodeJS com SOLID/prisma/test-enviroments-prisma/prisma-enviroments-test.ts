import 'dotenv/config.js'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import type { Environment } from 'vitest/environments'

function gerenateDataBaseURL(schema: string) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Internal error server!')
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    viteEnvironment: 'ssr',

    async setup() {
        const shemaUUID = randomUUID()
        const dataBaseUrl = gerenateDataBaseURL(shemaUUID);

        process.env.DATABASE_URL = dataBaseUrl

        execSync('npx prisma db push', {
            env: process.env,
            stdio: 'inherit',
        })

        const prisma = new PrismaClient({
            adapter: new PrismaPg(
                { connectionString: dataBaseUrl },
                { schema: shemaUUID },
            ),
        })

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`
                    DROP SCHEMA IF EXISTS ${quoteIdentifier(shemaUUID)} CASCADE
                `)

                await prisma.$disconnect()
            }
        }
    }
}

function quoteIdentifier(identifier: string) {
    return `"${identifier.replaceAll('"', '""')}"`
}
