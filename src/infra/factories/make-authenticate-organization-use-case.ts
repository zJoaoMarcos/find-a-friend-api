import { PrismaService } from '../db/prisma/prisma'
import { PrismaOrganizationRepository } from '../db/prisma/repositories/prisma-organization.repository'
import { AuthenticateOrganizationUseCase } from '@/application/use-cases/organization/authenticate-organization'

export function makeAuthenticateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository(PrismaService)
  const useCase = new AuthenticateOrganizationUseCase(organizationRepository)

  return useCase
}
