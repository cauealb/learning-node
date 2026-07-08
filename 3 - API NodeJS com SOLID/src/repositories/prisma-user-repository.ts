import { prisma } from "@/lib/prisma.js";
import type { UserRepository } from "./prisma/user-repository.js";
import type { UserCreateInput } from "prisma/generated/prisma/models.js";

export class PrismaUserRepository implements UserRepository {
    async create(data: UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user;
    }

    async findById(userId: string) {
        return await prisma.user.findFirst({ where: { id: userId } })
    }
}