import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { GetUserProfileUseCase } from "../get-user-profile.js";

export function MakeGetUserProfileUseCases() {
    const repository = new PrismaUserRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(repository)

    return getUserProfileUseCase
}