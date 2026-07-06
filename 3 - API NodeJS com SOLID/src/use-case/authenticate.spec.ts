import { InMemoryRepository } from '@/repositories/in-memory-repository.js'
import { describe, expect, it } from 'vitest'
import { AuthenticaUseCase } from './authenticate.js'
import { RegisterUseCase } from './register.js'
import { InvalidCredentialError } from './errors/invalid-credential-error.js'
import { hash } from 'bcryptjs'

describe("Authenticate test", () => {
    it("should be able validate in app", async () => {
        const userRepository = new InMemoryRepository()
        const sut = new AuthenticaUseCase(userRepository)

        await userRepository.create({
            name: 'Cauê',
            email: 'cauealvesb4@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const {user} = await sut.execute({ email: 'cauealvesb4@gmail.com', password: '123456'});
        expect(user.id).toEqual(expect.any(String))

    })

    it("should be able validate email exist", async () => {
        const userRepository = new InMemoryRepository()
        const sut = new AuthenticaUseCase(userRepository)

        await expect(() => sut.execute({ email: 'cauealvesb4@gmail.com', password: '123456'})).rejects.toBeInstanceOf(InvalidCredentialError);
    })

    it("should be able validate password", async () => {
        const userRepository = new InMemoryRepository()
        const sut = new AuthenticaUseCase(userRepository)

        await userRepository.create({
            name: 'Cauê',
            email: 'cauealvesb4@gmail.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => sut.execute({ email: 'cauealvesb4@gmail.com', password: '123123'})).rejects.toBeInstanceOf(InvalidCredentialError);
    })
})