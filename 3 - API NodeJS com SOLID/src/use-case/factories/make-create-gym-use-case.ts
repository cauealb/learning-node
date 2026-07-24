import { PrismGymsRepository } from "@/repositories/prisma-gyms-repository.js";
import { CreateGymUseCase } from "../create-gym.js";

export function MakeCreateGymUseCase() {
    const repository = new PrismGymsRepository()
    const createGymUseCase = new CreateGymUseCase(repository)

    return createGymUseCase
}