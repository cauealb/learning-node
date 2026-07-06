import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { AuthenticaUseCase } from "../authenticate.js";

export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository()
    const authenticaUseCase = new AuthenticaUseCase(userRepository)

    return authenticaUseCase
}