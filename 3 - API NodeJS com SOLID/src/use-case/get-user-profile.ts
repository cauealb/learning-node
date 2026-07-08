import type { UserRepository } from "@/repositories/prisma/user-repository.js";
import { ResourceNotFound } from "./errors/resource-not-found.js";
import type { User } from "prisma/generated/prisma/browser.js";

interface GetUserProfileRequest {
    userId: string
}

interface GetUserProfileResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ userId }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
        const user = await this.userRepository.findById(userId);
        if(!user) {
            throw new ResourceNotFound()
        }

        return { user };
    }
}