import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidadeCheckInUseCase } from "./validate-check-in.js";
import { InMemoryCheckInRepository } from "@/repositories/in-memory-check-in-repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import { afterEach } from "node:test";

let repository: CheckInRepository
let sut: ValidadeCheckInUseCase

describe("Validate check in", () => {

    beforeEach(() => {
        repository = new InMemoryCheckInRepository()
        sut = new ValidadeCheckInUseCase(repository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able validate a check-in", async () => {
        const createCheckIn = await repository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const {checkIn} = await sut.execute({
            checkInId:  createCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date));
    })

    it("should be able validate a check-in not used", async () => {
        expect(async () => {
            await sut.execute({
                checkInId:  'invalid-check-in'
            })
        }).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it("should not be able to validate the check-in after 21 minutes of its creation", async () => {
        vi.setSystemTime(new Date(2026, 6, 23, 10, 30, 0))

        const createCheckIn = await repository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const vinteMinutosEmMilissegundo = 1000 * 60* 21

        vi.advanceTimersByTime(vinteMinutosEmMilissegundo)

        expect(async () => {
            await sut.execute({
                checkInId: createCheckIn.id
            })
        }).rejects.toBeInstanceOf(Error)
    })
})