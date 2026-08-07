import { Prisma, type Gym } from "prisma/generated/prisma/client.js";
import type { GymCreateInput } from "prisma/generated/prisma/models.js";
import type { FindManyNearbyParams, gymsRepository } from "./prisma/gyms-repository.js";
import { prisma } from "@/lib/prisma.js";
import { env } from "@/env/index.js";

const schema = new URL(env.DATABASE_URL).searchParams.get('schema') ?? 'public'
const gymTable = Prisma.raw(`"${schema.replaceAll('"', '""')}"."Gym"`)

export class PrismGymsRepository implements gymsRepository {
    async create(data: GymCreateInput) {
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }

    async searchMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })
        
        return gyms
    }

    async findById(idGym: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id: idGym
            }
        })

        return gym
    }

    async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
        
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM ${gymTable}
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }
    
}
