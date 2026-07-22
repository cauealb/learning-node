import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";

export interface GetUserMetricsUseCaseRequest {
    userId: string
}

export interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(private checkinsRepository: CheckInRepository) {}

    async execute({ userId }:GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCount = await this.checkinsRepository.countByUserId(userId);

        return { checkInsCount }
    }
}