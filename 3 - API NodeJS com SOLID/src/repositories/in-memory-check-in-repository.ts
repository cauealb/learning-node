import type { CheckIn } from "prisma/generated/prisma/browser.js";
import type { CheckInUncheckedCreateInput } from "prisma/generated/prisma/models.js";
import type { CheckInRepository } from "./prisma/check-in-repository.js";

export class InMemoryCheckInRepository implements CheckInRepository {
    private items: CheckIn[] = [] 

    async create(data: CheckInUncheckedCreateInput) {
        const checkIn: CheckIn = {
            id: 'check-in-01',
            gym_id: data.gym_id,
            user_id: data.user_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null
        }

        this.items.push(checkIn)
        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const checkIn = this.items.find(item => item.user_id === userId);

        if(!checkIn) {
            return null
        }

        return checkIn
    }
}