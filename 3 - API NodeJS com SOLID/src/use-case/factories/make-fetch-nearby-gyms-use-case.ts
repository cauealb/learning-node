import { PrismGymsRepository } from "@/repositories/prisma-gyms-repository.js";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.js";

export function MakeFetchNearbyGymsUseCase() {
    const repository = new PrismGymsRepository()
    const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(repository)

    return fetchNearbyGymsUseCase
}