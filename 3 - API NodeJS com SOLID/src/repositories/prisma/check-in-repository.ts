import type { CheckIn } from "prisma/generated/prisma/browser.js";
import type { CheckInUncheckedCreateInput } from "prisma/generated/prisma/models.js";

export interface CheckInRepository {
    create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}