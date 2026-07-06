import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory-repository.js'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error.js'

let userRepository: InMemoryRepository
let sut: RegisterUseCase

describe("Test Unit", () => {
    beforeEach(() => {
        userRepository = new InMemoryRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it("should be able create one user", async () => {
        const user = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '1234'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should to validate the hash password", async () => {
        const password = '12345'

        const user = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password
        })

        const isHashPasswordSuccess = await compare(password, user.password_hash)
        expect(isHashPasswordSuccess).toBe(true);
    })

    it("should be able to validate email equal", async () => {
        const email = 'johndoe@gmail.com';

        await sut.execute({
            name: 'John Doe',
            email,
            password: '1234'
        });

        await expect(async () => await sut.execute({
            name: 'John Doe',
            email,
            password: '1234'
        })).rejects.toBeInstanceOf(EmailAlreadyExistsError)
    })
})