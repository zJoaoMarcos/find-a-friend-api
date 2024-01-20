import { GetProfileOrganizationUseCase } from '@/application/use-cases/organization/get-profile-organization'
import { PrismaService } from '../db/prisma/prisma'
import { PrismaOrganizationRepository } from '../db/prisma/repositories/prisma-organization.repository'

export function makeGetProfileOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository(PrismaService)
  const useCase = new GetProfileOrganizationUseCase(organizationRepository)

  return useCase
}
