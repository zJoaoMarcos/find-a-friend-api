import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { LocationNotFoundError } from './errors/location-not-found-error'

export class GetLocationsOfOrganizationsUseCase {
  constructor(private organizationRepo: IOrganizationRepository) {}

  async execute() {
    const locations = await this.organizationRepo.findLocations()

    if (!locations) throw new LocationNotFoundError()

    const nestedLocations = locations.reduce(
      (acc, currentValue) => {
        const { state, city } = currentValue

        const stateIndex = acc.findIndex((item) => item.name === state)

        if (stateIndex !== -1) {
          acc[stateIndex].cities.push({ name: city })
        } else {
          acc.push({
            name: state,
            cities: [{ name: city }],
          })
        }

        return acc
      },
      [] as Array<{ name: string; cities: { name: string }[] }>,
    )

    return nestedLocations
  }
}
