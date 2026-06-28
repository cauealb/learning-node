import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory-repository.js'

describe("Test Unit", () => {
    it("shoul be able create one user", async () => {
        const UserRepository = new InMemoryRepository()
        const UseCaseRegister = new RegisterUseCase(UserRepository);

        const user = await UseCaseRegister.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '1234'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should to validate the hash password", async () => {
        const UserRepository = new InMemoryRepository()
        const UseCaseRegister = new RegisterUseCase(UserRepository)

        const user = await UseCaseRegister.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '1234'
        })

        const isHashPasswordSuccess = await compare('1234', user.password_hash)

        expect(isHashPasswordSuccess).toBe(true);
    })
})