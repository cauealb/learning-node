import type { User } from "prisma/generated/prisma/browser.js";
import type { UserCreateInput } from "prisma/generated/prisma/models.js";

export interface UserRepository {
    create(data: UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>
}