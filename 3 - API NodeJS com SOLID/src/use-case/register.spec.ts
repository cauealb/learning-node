import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory-repository.js'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error.js'

describe("Test Unit", () => {
    it("should be able create one user", async () => {
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

        const password = '12345'

        const user = await UseCaseRegister.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password
        })

        const isHashPasswordSuccess = await compare(password, user.password_hash)

        expect(isHashPasswordSuccess).toBe(true);
    })

    it("should be able to validate email equal", async () => {
        const UserRepository = new InMemoryRepository()
        const UseCaseRegister = new RegisterUseCase(UserRepository)

        const email = 'johndoe@gmail.com';

        await UseCaseRegister.execute({
            name: 'John Doe',
            email,
            password: '1234'
        });

        await expect(async () => await UseCaseRegister.execute({
            name: 'John Doe',
            email,
            password: '1234'
        })).rejects.toBeInstanceOf(EmailAlreadyExistsError)
    })
})