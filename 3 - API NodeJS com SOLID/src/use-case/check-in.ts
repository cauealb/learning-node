import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import type { CheckIn } from "prisma/generated/prisma/browser.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { GetDistanceBetweenCoordinates } from "@/utils/get-distance-betwenn-coordinates.js";

interface CheckInRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
        private gymsRepository: gymsRepository
    ) {}

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInRequest): Promise<CheckInResponse> {
        const gym = await this.gymsRepository.findById(gymId)
        if(!gym) {
            throw new ResourceNotFound()
        }

        const distance = await GetDistanceBetweenCoordinates(
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
            { latitude: userLatitude, longitude: userLongitude }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1
        if(distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error()
        }

        const checkInUserOnDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())
        if(checkInUserOnDate) {
            throw new Error()
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId, 
            gym_id: gymId
        })

        return { checkIn };
    }
}