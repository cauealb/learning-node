import { PrismaCheckInRepository } from "@/repositories/prisma-check-in-repository.js";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history.js";

export function MakeFetchUserCheckInHistoryUseCase() {
    const repository = new PrismaCheckInRepository()
    const fetchUserCheckInsHistory = new FetchUserCheckInsHistoryUseCase(repository)

    return fetchUserCheckInsHistory
}