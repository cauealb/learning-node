import type { Gym } from "prisma/generated/prisma/client.js";
import type { gymsRepository } from "./prisma/gyms-repository.js";
import type { GymCreateInput } from "prisma/generated/prisma/models.js";
import { Decimal } from "@prisma/client/runtime/client";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements gymsRepository {
    private item: Gym[] = []

    async create(gym: GymCreateInput) {
        const data: Gym = {
            id: gym.id ?? randomUUID(),
            title: gym.title,
            description: gym.description ?? null,
            phone: gym.phone ?? null,
            latitude: new Decimal(gym.latitude.toString()),
            longitude: new Decimal(gym.longitude.toString()),
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

    async searchMany(query: string, page: number) {
        return this.item
            .filter(item => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }
}