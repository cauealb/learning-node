import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { GetUserProfileUseCase } from "../get-user-profile.js";

export function MakeGetUserMetricsUseCase() {
    const repository = new PrismaUserRepository()
    const getUserMetricsUseCase = new GetUserProfileUseCase(repository)

    return getUserMetricsUseCase
}