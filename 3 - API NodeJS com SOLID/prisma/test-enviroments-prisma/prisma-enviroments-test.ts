import 'dotenv/config.js'
import { prisma } from '@/lib/prisma.js'
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

        execSync('npx prisma db push')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`
                    DROP SCHEMA IF EXISTS ${shemaUUID} CASCADE    
                `)

                await prisma.$disconnect()
            }
        }
    }
}