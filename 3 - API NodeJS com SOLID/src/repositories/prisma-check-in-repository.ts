import type { CheckIn } from "prisma/generated/prisma/browser.js";
import type { CheckInUncheckedCreateInput } from "prisma/generated/prisma/models.js";
import type { CheckInRepository } from "./prisma/check-in-repository.js";
import { prisma } from "@/lib/prisma.js";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfDate = dayjs(date).startOf('date');
        const endOfDate = dayjs(date).endOf('date');

        const checkIns = await prisma.checkIn.findFirst({
            where: {
                id: userId,
                created_at: {
                    gte: startOfDate.toDate(),
                    lte: endOfDate.toDate()
                }
            },
        })

        return checkIns
    }

    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return checkIns
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                id: userId
            }
        })

        return count;
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkIn
    }

    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id
            },
            data
        })

        return checkIn
    }
    
}