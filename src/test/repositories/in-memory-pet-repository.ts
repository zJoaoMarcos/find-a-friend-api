import {
  IPetFindManyQuery,
  IPetRepository,
} from '@/application/repositories/pet.repository'
import { Prisma, Pet } from '@prisma/client'

export class InMemoryPetRepository implements IPetRepository {
  public items: Pet[] = []

  async create(pet: Prisma.PetUncheckedCreateInput): Promise<void> {
    this.items.push(pet as Pet)
  }

  async save(pet: Prisma.PetUpdateInput): Promise<void> {
    const index = this.items.findIndex((item) => item.id === pet.id)

    this.items[index] = pet as Pet
  }

  async findMany(params: IPetFindManyQuery): Promise<Pet[] | null> {
    const {
      city,
      age,
      environment,
      levelOfIndependence,
      name,
      orderBy,
      size,
      status,
    } = params

    let pets = []

    pets = this.items.filter((item) => item.city === city)

    if (!pets) return null

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }
}
