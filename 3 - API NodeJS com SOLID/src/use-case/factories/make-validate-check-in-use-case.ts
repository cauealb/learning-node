import { PrismaCheckInRepository } from "@/repositories/prisma-check-in-repository.js";
import { ValidadeCheckInUseCase } from "../validate-check-in.js";

export function MakeValidateCheckInUseCase() {
    const repository = new PrismaCheckInRepository()
    const validateCheckInUseCase = new ValidadeCheckInUseCase(repository)

    return validateCheckInUseCase
}