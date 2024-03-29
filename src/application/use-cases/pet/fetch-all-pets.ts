import {
  IPetFindManyQuery,
  IPetRepository,
} from '@/application/repositories/pet.repository'
import { PetNotFoundError } from './errors/pet-not-found.error'

type FetchAllPetsUseCaseRequest = IPetFindManyQuery

export class FetchAllPetsUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(params: FetchAllPetsUseCaseRequest) {
    const pets = await this.petRepository.findMany(params)

    if (!pets) throw new PetNotFoundError()

    return {
      pets,
      totalCount: pets.length,
    }
  }
}
