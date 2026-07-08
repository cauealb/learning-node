import { InMemoryRepository } from "@/repositories/in-memory-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile.js";
import type { UserRepository } from "@/repositories/prisma/user-repository.js";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "./errors/resource-not-found.js";

let userRepository: UserRepository
let sut: GetUserProfileUseCase

describe("Get User Profile Test", () => {
    beforeEach(() => {
        userRepository = new InMemoryRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it("should be able find user", async () => {
        const userCreated = await userRepository.create({
            name: 'Cauê',
            email: 'cauealvesb4@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({ userId: userCreated.id });
        expect(user.name).toEqual('Cauê');
    })

    it("should be able not find user", async () => {
        expect(async () => {
            await sut.execute({ userId: 'non-find-id' })
        }).rejects.toBeInstanceOf(ResourceNotFound)
    })
})