import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { IPetRepository } from '@/application/repositories/pet.repository'
import { OrganizationNotFoundError } from '../organization/errors/organization-not-found.error'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  levelOfIndependence: number
  photos: string[]
  environment: string
  requirementsForAdoption: string[]
  organizationId: string
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: IPetRepository,
    private organizationRepository: IOrganizationRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    levelOfIndependence,
    photos,
    environment,
    requirementsForAdoption,
    organizationId,
  }: RegisterPetUseCaseRequest) {
    const organizationExists =
      await this.organizationRepository.findById(organizationId)

    if (!organizationExists) throw new OrganizationNotFoundError()

    const pet = {
      name,
      about,
      age,
      size,
      level_of_independence: levelOfIndependence,
      photos,
      environment,
      requirements_for_adoption: requirementsForAdoption,
      organization_id: organizationId,
      status: 'available',
    }

    await this.petRepository.create(pet)
  }
}
