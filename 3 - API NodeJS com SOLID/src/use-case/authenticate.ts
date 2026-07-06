import type { UserRepository } from "@/repositories/prisma/user-repository.js";
import { InvalidCredentialError } from "./errors/invalid-credential-error.js";
import { compare } from "bcryptjs";
import type { User } from "prisma/generated/prisma/browser.js";

interface AuthenticaUseCaseRequest {
    email: string
    password: string
}

interface AuthenticaUseCaseResponse {
    user: User
}

export class AuthenticaUseCase {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute({ email, password }: AuthenticaUseCaseRequest): Promise<AuthenticaUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) {
            throw new InvalidCredentialError;
        }

        const doesPasswordMatches = await compare(password, user.password_hash);
        if(!doesPasswordMatches) {
            throw new InvalidCredentialError;
        }

        return { user };
    }
}