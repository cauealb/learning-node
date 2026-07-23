import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import type { CheckIn } from "prisma/generated/prisma/browser.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import dayjs from "dayjs";

export interface ValidadeCheckInRequest {
    checkInId: string
}

export interface ValidadeCheckInResponse {
    checkIn: CheckIn
}

export class ValidadeCheckInUseCase {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({ checkInId }: ValidadeCheckInRequest): Promise<ValidadeCheckInResponse> {
        const checkIn = await this.checkInRepository.findById(checkInId);
        if(!checkIn) {
            throw new ResourceNotFound()
        }

        const distanceInMinutesCheckIn = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )

        if(distanceInMinutesCheckIn > 20) {
            throw new Error()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)
        return { checkIn }
    }
}