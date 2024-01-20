import { FetchAllPetsUseCase } from '@/application/use-cases/pet/fetch-all-pets'
import { PrismaService } from '../db/prisma/prisma'
import { PrismaPetRepository } from '../db/prisma/repositories/prisma-pet.repository'

export function makeFetchAllPetsUseCase() {
  const petRepository = new PrismaPetRepository(PrismaService)
  const useCase = new FetchAllPetsUseCase(petRepository)

  return useCase
}
