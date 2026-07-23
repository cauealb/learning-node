import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import type { Gym } from "prisma/generated/prisma/browser.js";

export interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

export interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: gymsRepository) {}

    async execute({ userLatitude, userLongitude }:FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude, longitude: userLongitude
        })

        return { gyms } 
    }
}