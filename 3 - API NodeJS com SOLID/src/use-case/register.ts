import { prisma } from "@/lib/prisma.js";
import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { hash } from "bcryptjs";

const prismaUserRepository = new PrismaUserRepository()


export interface RegisterUseCase {
    name: string
    email: string
    password: string
}

export async function RegisterUseCase({ name, email, password }: RegisterUseCase) {
    const password_hash = await hash(password, 6);
    
    const findEmailWithSame = await prisma.user.findUnique({
        where: {
            email
        }
    })
    
    if (findEmailWithSame) {
        throw new Error('E-mail already exists!!')
    }

    prismaUserRepository.create({ name, email, password: password_hash })
}