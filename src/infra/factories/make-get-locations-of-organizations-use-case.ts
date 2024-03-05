import { GetLocationsOfOrganizationsUseCase } from '@/application/use-cases/organization/get-locations-of-organizations'
import { PrismaService } from '../db/prisma/prisma'
import { PrismaOrganizationRepository } from '../db/prisma/repositories/prisma-organization.repository'

export function makeGetLocationsOfOrganizationsUseCase() {
  const organizationRepository = new PrismaOrganizationRepository(PrismaService)
  const useCase = new GetLocationsOfOrganizationsUseCase(organizationRepository)

  return useCase
}
