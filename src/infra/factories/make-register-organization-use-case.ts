import { RegisterOrganizationUseCase } from '@/application/use-cases/organization/register-organization'
import { PrismaService } from '../db/prisma/prisma'
import { PrismaOrganizationRepository } from '../db/prisma/repositories/prisma-organization.repository'

export function makeRegisterOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository(PrismaService)
  const useCase = new RegisterOrganizationUseCase(organizationRepository)

  return useCase
}
