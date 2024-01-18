import { IPetRepository } from '@/application/repositories/pet.repository'
import { PetNotFoundError } from './errors/pet-not-found.error'

interface FetchAllPetsUseCaseRequest {
  city?: string
  name?: string
  age?: string
  size?: string
  levelOfIndependence?: string
  environment?: string
  orderBy?: 'ASC' | 'DESC'
}

/* interface FetchAllPetsUseCaseResponse {
  
} */

export class FetchAllPetsUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute({
    city,
    age,
    levelOfIndependence,
    name,
    size,
  }: FetchAllPetsUseCaseRequest) {
    const $params: any = {}

    if (city)
      $params.where.organizationId = {
        city,
      }
    if (age) $params.where.age = age
    if (name) $params.where.name = name
    if (size) $params.where.size = size
    if (levelOfIndependence)
      $params.where.levelOfIndependence = levelOfIndependence

    const pets = await this.petRepository.findMany({ ...$params })

    if (!pets) throw new PetNotFoundError()

    return {
      pets,
      totalCount: pets.length,
    }
  }
}
