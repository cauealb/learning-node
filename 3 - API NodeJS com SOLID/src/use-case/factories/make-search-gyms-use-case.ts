import { PrismGymsRepository } from "@/repositories/prisma-gyms-repository.js";
import { SearchGymsUseCase } from "../search-gyms.js";

export function MakeSearchGymsUseCase() {
    const repository = new PrismGymsRepository()
    const searchGymsUseCase = new SearchGymsUseCase(repository)

    return searchGymsUseCase
}