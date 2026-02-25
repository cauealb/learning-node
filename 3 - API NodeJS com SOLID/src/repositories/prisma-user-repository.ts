import { prisma } from "@/lib/prisma.js";
import type { RegisterUseCase } from "@/use-case/register.js";

export class PrismaUserRepository {
    async create({ name, email, password }: RegisterUseCase) {
        const user = await prisma.user.create({
            data: {
                name, email, password_hash: password
            }
        })

        return user;
    }
}