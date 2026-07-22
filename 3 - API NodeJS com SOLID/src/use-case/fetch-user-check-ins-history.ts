import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import type { CheckIn } from "prisma/generated/prisma/browser.js";
import { check } from "zod";

export interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

export interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private checkIns: CheckInRepository) {}

    async execute({ userId, page }:FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkIns.findManyByUserId(userId, page)

        return { checkIns }
    }
}