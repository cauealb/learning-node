import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms.js";
import { InMemoryGymsRepository } from "@/repositories/in-memory-gyms-repository.js";

let repository: gymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch nearby gym", () => {

    beforeEach(() => {
        repository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(repository)
    })

    it("should be able find nearby gym", async () => {
        repository.create({
            title: 'One Gym',
            latitude: -23.4243651,
            longitude: -46.5011717
        })

        repository.create({
            title: 'Two Gym',
            latitude: -23.5064001,
            longitude: -46.759936
        })

        const { gyms } = await sut.execute(
            { userLatitude: -23.5064001, userLongitude: -46.759936}
        )

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'Two Gym'
            })
        ])
    })
})