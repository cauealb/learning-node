import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics.js";
import { InMemoryCheckInRepository } from "@/repositories/in-memory-check-in-repository.js";

let repository: CheckInRepository
let sut: GetUserMetricsUseCase

describe("Get User Metrics test", () => {
    beforeEach(() => {
        repository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(repository)
    })

    it("should be able take user metrics", async () => {
        await repository.create({
            user_id: 'user-01',
            gym_id: 'gym-01'
        })

        await repository.create({
            user_id: 'user-01',
            gym_id: 'gym-02'
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01'
        })

        expect(checkInsCount).toBe(2)
    })
})