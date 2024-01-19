import {
  IPetFindManyQuery,
  IPetRepository,
} from '@/application/repositories/pet.repository'
import { Pet, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma'
import { DefaultArgs } from '@prisma/client/runtime/library'

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
    const { age, city, levelOfIndependence, name, orderBy, size } = params
    const $params: Prisma.PetFindManyArgs = {}

    if (city)
      $params.where = {
        organization_id: city,
      }
    if (age) $params.where = { age }
    if (name) $params.where = { name }
    if (size) $params.where = { size }
    if (levelOfIndependence)
      $params.where = { level_of_independence: levelOfIndependence }
    if (orderBy)
      $params.orderBy = {
        age: orderBy,
      }

    const pets = await this.prismaService.pet.findMany({ ...$params })

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
