import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import type { Gym } from "prisma/generated/prisma/browser.js";

export interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

export interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    constructor(private gymsRepository: gymsRepository) {}

    async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.searchMany(query, page)

        return { gyms }
    }
}