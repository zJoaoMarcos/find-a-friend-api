import {
  IPetFindManyQuery,
  IPetRepository,
} from '@/application/repositories/pet.repository'
import { Pet, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma'

export class PrismaPetRepository implements IPetRepository {
  constructor(private prismaService: typeof PrismaService) {}

  async create(pet: Prisma.PetUncheckedCreateInput): Promise<void> {
    await this.prismaService.pet.create({
      data: {
        ...pet,
      },
    })
  }

  async save(pet: Prisma.PetUpdateInput): Promise<void> {
    await this.prismaService.pet.update({
      where: {
        id: pet.id as string,
      },
      data: {
        ...pet,
      },
    })
  }

  async findMany(params: IPetFindManyQuery): Promise<Pet[] | null> {
    const { state, city, age, levelOfIndependence, name, orderBy, size } =
      params

    const $match: Prisma.PetFindManyArgs = {}

    $match.where = {
      organizationId: {
        state,
        city,
      },
    }

    if (age) $match.where = { age }
    if (name) $match.where = { name }
    if (size) $match.where = { size }
    if (levelOfIndependence)
      $match.where = { level_of_independence: levelOfIndependence }
    if (orderBy)
      $match.orderBy = {
        ...orderBy,
      }

    const pets = await this.prismaService.pet.findMany({ ...$match })

    if (!pets) return null

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await this.prismaService.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) return null

    return pet
  }
}
