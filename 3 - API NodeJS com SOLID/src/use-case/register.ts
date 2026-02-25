import { prisma } from "@/lib/prisma.js";
import { hash } from "bcryptjs";

interface RegisterUseCaseParams {
    name: string
    email: string
    password: string
}

export async function RegisterUseCase({ name, email, password }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 6);

    const findEmailWithSame = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (findEmailWithSame) {
        throw new Error('E-mail already exists!!')
    }
    
    await prisma.user.create({
        data: {
            name,
            email, 
            password_hash
        }
    })
}