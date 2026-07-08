import type { User } from "prisma/generated/prisma/browser.js";
import type { UserCreateInput } from "prisma/generated/prisma/models.js";
import type { UserRepository } from "./prisma/user-repository.js";

export class InMemoryCheckInRepository implements UserRepository {
    private items: User[] = []

    async create(data: UserCreateInput) {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(user)
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email);

        if(!user) {
            return null
        }

        return user;
    }

    async findById(userId: string) {
        const user = this.items.find(item => item.id === userId);
        if(user) {
            return user
        }

        return null
    }
}