import { GetPetByIdUseCase } from '@/application/use-cases/pet/get-pet-by-id'
import { PrismaService } from '../db/prisma/prisma'
import { PrismaPetRepository } from '../db/prisma/repositories/prisma-pet.repository'

export function makeGetPetByIdUseCase() {
  const petRepository = new PrismaPetRepository(PrismaService)
  const useCase = new GetPetByIdUseCase(petRepository)

  return useCase
}
