import type { Gym } from "prisma/generated/prisma/client.js";
import type { gymsRepository } from "./prisma/gyms-repository.js";
import type { GymCreateInput } from "prisma/generated/prisma/models.js";
import { Decimal } from "@prisma/client/runtime/client";

export class InMemoryGymsRepository implements gymsRepository {
    private item: Gym[] = []

    async create(gym: GymCreateInput) {
        const data: Gym = {
            id: 'gym-01',
            title: 'gym.title',
            description: 'TypeScript Gym',
            phone: '',
            latitude: new Decimal(-23.5064001),
            longitude: new Decimal(-46.759936),
        }

        this.item.push(data)
        return data
    }

    async findById(idGym: string): Promise<Gym | null> {
        const gym = this.item.find(item => item.id === idGym)

        if(!gym) {
            return null
        }

        return gym
    }
}