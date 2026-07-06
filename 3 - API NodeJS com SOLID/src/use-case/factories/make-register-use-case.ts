import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { RegisterUseCase } from "../register.js";

export function makeRegisterUseCase() {
    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    return registerUseCase
}