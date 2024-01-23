import { IPetRepository } from '@/application/repositories/pet.repository'
import { PetNotFoundError } from './errors/pet-not-found.error'

interface GetPetByIdUseCaseRequest {
  petId: string
}

export class GetPetByIdUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute({ petId }: GetPetByIdUseCaseRequest) {
    const pet = await this.petRepository.findById(petId)

    if (!pet) throw new PetNotFoundError()

    return pet
  }
}
