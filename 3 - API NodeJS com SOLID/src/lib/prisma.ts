import { env } from "../env/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/prisma/client.js";

const connectionString = `${env.DATABASE_URL}`;
const schema = new URL(connectionString).searchParams.get('schema') ?? 'public'
const adapter = new PrismaPg({ connectionString }, { schema });
const prisma = new PrismaClient({ adapter, log: env.NODE_ENV === 'dev' ? ['query'] : []  });

export { prisma };
