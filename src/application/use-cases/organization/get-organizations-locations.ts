import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { LocationNotFoundError } from './errors/location-not-found-error'

export class GetOrganizationsLocatioUseCase {
  constructor(private organizationRepo: IOrganizationRepository) {}

  async execute() {
    const locations = await this.organizationRepo.findLocations()

    if (!locations) throw new LocationNotFoundError()
  }
}
