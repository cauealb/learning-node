import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms.js";
import { InMemoryGymsRepository } from "@/repositories/in-memory-gyms-repository.js";

let repository: gymsRepository
let sut: SearchGymsUseCase

describe("Search Gyms Use Case test", () => {
    beforeEach(() => {
        repository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(repository)
    })

    it("should be able find many gyms", async () => {
        await repository.create({
            title: 'JavaScript Gym',
            latitude: -23.5064001,
            longitude: -46.759936
        })

        await repository.create({
            title: 'TypeScript Gym',
            latitude: -23.5064001,
            longitude: -46.759936
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1
        });

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ])
    })
})