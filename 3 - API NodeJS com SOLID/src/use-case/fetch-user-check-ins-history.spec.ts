import type { CheckInRepository } from "@/repositories/prisma/check-in-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history.js";
import { InMemoryCheckInRepository } from "@/repositories/in-memory-check-in-repository.js";

let repository: CheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe("Fetch User CheckIns History test", () => {

    beforeEach(() => {
        repository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckInsHistoryUseCase(repository)
    })

    it("should be able find user checkins", async () => {
        await repository.create({
            user_id: 'user-01',
            gym_id: 'gym-01'
        })

        await repository.create({
            user_id: 'user-01',
            gym_id: 'gym-02'
        })

        const checkins = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkins.checkIns).toHaveLength(2)
        expect(checkins.checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })
        ])
    })

    it("should be able validate pagination", async ()=> {
        for(let i = 1; i <= 22; i++) {
            await repository.create({
                gym_id: `gym-0${i}`,
                user_id: 'user-01',
            })
        }

        const checkins = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        console.log(checkins.checkIns)

        expect(checkins.checkIns).toHaveLength(2)
        expect(checkins.checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-021' }),
            expect.objectContaining({ gym_id: 'gym-022' }),
        ])
    })
})