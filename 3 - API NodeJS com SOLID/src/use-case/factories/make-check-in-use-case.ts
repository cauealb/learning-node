import { PrismaCheckInRepository } from "@/repositories/prisma-check-in-repository.js";
import { CheckInUseCase } from "../check-in.js";
import { PrismGymsRepository } from "@/repositories/prisma-gyms-repository.js";

export function MakeCheckInUseCase() {
    const checkInRepository = new PrismaCheckInRepository()
    const gymsRepository = new PrismGymsRepository()
    const checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)

    return checkInUseCase
}