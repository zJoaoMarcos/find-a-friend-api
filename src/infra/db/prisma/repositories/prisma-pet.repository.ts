import { IPetRepository } from '@/application/repositories/pet.repository'
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

  async findMany(params: Prisma.PetFindManyArgs): Promise<Pet[] | null> {
    const pets = await this.prismaService.pet.findMany({
      ...params,
    })

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
