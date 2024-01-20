import { RegisterPetUseCase } from '@/application/use-cases/pet/register-pet'
import { PrismaService } from '../db/prisma/prisma'
import { PrismaPetRepository } from '../db/prisma/repositories/prisma-pet.repository'
import { PrismaOrganizationRepository } from '../db/prisma/repositories/prisma-organization.repository'

export function makeRegisterPetUseCase() {
  const petRepository = new PrismaPetRepository(PrismaService)
  const organizationRepository = new PrismaOrganizationRepository(PrismaService)
  const useCase = new RegisterPetUseCase(petRepository, organizationRepository)

  return useCase
}
