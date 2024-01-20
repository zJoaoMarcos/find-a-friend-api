import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { OrganizationNotFoundError } from './errors/organization-not-found.error'

interface GetProfileOrganizationUseCaseRequest {
  organizationId: string
}

export class GetProfileOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) {}

  async execute({ organizationId }: GetProfileOrganizationUseCaseRequest) {
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) throw new OrganizationNotFoundError()

    return organization
  }
}
