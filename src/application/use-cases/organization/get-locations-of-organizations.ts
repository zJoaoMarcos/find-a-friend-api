import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { LocationNotFoundError } from './errors/location-not-found-error'

export class GetLocationsOfOrganizationsUseCase {
  constructor(private organizationRepo: IOrganizationRepository) {}

  async execute() {
    const locations = await this.organizationRepo.findLocations()

    if (!locations) throw new LocationNotFoundError()

    const nestedLocations: Array<{
      name: string
      cities: { name: string }[]
    }> = []
    locations.reduce((acc, currentValue) => {
      const stateAlreadyExists = nestedLocations.find(
        (item) => item.name === currentValue.state,
      )

      if (stateAlreadyExists) {
        stateAlreadyExists.cities.push({ name: currentValue.city })
      } else {
        nestedLocations.push({
          name: currentValue.state,
          cities: [{ name: currentValue.city }],
        })
      }

      return acc
    }, [])

    return nestedLocations
  }
}
