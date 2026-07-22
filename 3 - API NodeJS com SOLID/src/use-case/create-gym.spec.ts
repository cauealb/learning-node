import type { gymsRepository } from "@/repositories/prisma/gyms-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym.js";
import { InMemoryGymsRepository } from "@/repositories/in-memory-gyms-repository.js";

let repository: gymsRepository
let sut: CreateGymUseCase

describe("Create gym test", () => {
    beforeEach(() => {
        repository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(repository)
    })

    it("should be able create a gym", async () => {
        const { gym } = await sut.execute({
            title: 'Javascript Gym',
            latitude: -23.5064001,
            longitude: -46.759936
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})