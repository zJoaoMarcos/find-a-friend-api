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

    if (age) pets = pets.filter((item) => item.age === age)
    if (name) pets = pets.filter((item) => item.name === name)
    if (size) pets = pets.filter((item) => item.size === size)
    if (status) pets = pets.filter((item) => item.status === status)
    if (levelOfIndependence)
      pets = pets.filter(
        (item) => item.level_of_independence === levelOfIndependence,
      )
    if (environment)
      pets = pets.filter((item) => item.environment === environment)

    if (orderBy) {
      if (orderBy.age && orderBy.age === 'asc') {
        pets = pets.sort((a, b) => a.age.localeCompare(b.age))
      } else {
        pets = pets.sort((a, b) => b.age.localeCompare(a.age))
      }

      if (
        orderBy.levelOfIndependence &&
        orderBy.levelOfIndependence === 'asc'
      ) {
        pets = pets.sort(
          (a, b) => a.level_of_independence - b.level_of_independence,
        )
      } else {
        pets = pets.sort(
          (a, b) => b.level_of_independence - a.level_of_independence,
        )
      }

      if (orderBy.status && orderBy.status === 'asc') {
        pets = pets.sort((a, b) => a.status.localeCompare(b.status))
      } else {
        pets = pets.sort((a, b) => b.status.localeCompare(a.status))
      }
    }

    if (!pets) return null

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }
}
