import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in.js";
import { InMemoryCheckInRepository } from "@/repositories/in-memory-check-in-repository.js";
import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import { InMemoryGymsRepository } from "@/repositories/in-memory-gyms-repository.js";

let checkInRepository: CheckInRepository
let gymRepository: gymsRepository
let sut: CheckInUseCase

describe("Check-In Test", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInRepository, gymRepository)

        await gymRepository.create({
            id: 'gym-01',
            title: 'JavaScript Gym',
            latitude: -23.5064001,
            longitude: -46.759936,
        })

    })

    it("should be able to create check-in", async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -23.5064001,
            userLongitude: -46.759936
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("should not be able to create check-in with same day", async () => {
        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -23.5064001,
            userLongitude: -46.759936
        })

        expect(async () =>  {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: -23.5064001,
                userLongitude: -46.759936
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it("should be able validate distance between two points", async () => {
        expect(async () => {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: -23.5479414,
                userLongitude: -46.5321067
            })
        }).rejects.toBeInstanceOf(Error)
    })
})