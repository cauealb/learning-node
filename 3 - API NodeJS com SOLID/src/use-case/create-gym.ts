import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import type { Gym } from "prisma/generated/prisma/browser.js";

interface CreateGymRequest {
    title: string
    description?: string | null
    phone?: string | null
    latitude: number
    longitude: number
}

interface CreateGymResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymsRepository: gymsRepository) {}

    async execute({ title, description, phone, latitude, longitude }: CreateGymRequest): Promise<CreateGymResponse> {
        const gym = await this.gymsRepository.create({
            title: title, 
            description: description ?? null,
            phone: phone ?? null,
            latitude: latitude,
            longitude: longitude
        })

        return { gym }
    }
}