import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'

describe("Test Unit", () => {
    it("should to validate the hash password", async () => {
        const UseCaseRegister = new RegisterUseCase({
            async create(data)  {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            },
            
            async findByEmail(email) {
                return null
            }
        })

        const user = await UseCaseRegister.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '1234'
        })

        const isHashPasswordSuccess = await compare('1234', user.password_hash)

        expect(isHashPasswordSuccess).toBe(true);
    })
})