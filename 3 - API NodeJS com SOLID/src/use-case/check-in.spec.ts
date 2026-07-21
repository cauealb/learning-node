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
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInRepository, gymRepository)

        gymRepository.create({
            title: '',
            latitude: 0,
            longitude: 0,
        })

    })

    it("should be able to create check-in", async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    // - [x] Red
    // - [x] Green
    // - [] Refactor

    it("should not be able to create check-in with same day", async () => {
        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(async () =>  {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: 0,
                userLongitude: 0
            })
        }).rejects.toBeInstanceOf(Error)
    })
})