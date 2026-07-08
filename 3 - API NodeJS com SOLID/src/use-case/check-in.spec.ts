import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in.js";
import { InMemoryCheckInRepository } from "@/repositories/in-memory-check-in-repository.js";

let checkInRepository: CheckInRepository
let sut: CheckInUseCase

describe("Check-In Test", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository)
    })

    it("should be able to create check-in", async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
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
        })

        expect(async () =>  {
            await sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})