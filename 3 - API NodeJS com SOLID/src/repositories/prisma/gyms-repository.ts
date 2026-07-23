import type { Gym } from "prisma/generated/prisma/client.js";
import type { GymCreateInput } from "prisma/generated/prisma/models.js";

export interface FindManyNearbyParams {
    latitude: number,
    longitude: number
}

export interface gymsRepository {
    create(gym: GymCreateInput): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
    findById(idGym: string): Promise<Gym | null>
    findManyNearby(param: FindManyNearbyParams): Promise<Gym[]>
}