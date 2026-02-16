import 'dotenv/config.js'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(1414)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('❌ Variáveis de ambiente faltando: ', _env.error.format());

    throw new Error('Variáveis de ambiente faltando');
}

export const env = _env.data