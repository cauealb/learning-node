import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ValidadeCheckInUseCase } from "./validate-check-in.js";
import { InMemoryCheckInRepository } from "@/repositories/in-memory-check-in-repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";

let repository: CheckInRepository
let sut: ValidadeCheckInUseCase

describe("Validate check in", () => {

    beforeEach(() => {
        repository = new InMemoryCheckInRepository()
        sut = new ValidadeCheckInUseCase(repository)
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
})