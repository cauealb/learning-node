import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { GetUserMetricsUseCase } from "../get-user-metrics.js";
import { PrismaCheckInRepository } from "@/repositories/prisma-check-in-repository.js";

export function MakeGetUserMetricsUseCase() {
    const repository = new PrismaCheckInRepository()
    const getUserMetricsUseCase = new GetUserMetricsUseCase(repository)

    return getUserMetricsUseCase
}