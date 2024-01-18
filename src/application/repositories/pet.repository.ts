import { Pet, Prisma } from '@prisma/client'

export interface IPetRepository {
  create(pet: Prisma.PetUncheckedCreateInput): Promise<void>
  save(pet: Prisma.PetUpdateInput): Promise<void>
  findMany(params: Prisma.PetFindManyArgs): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
}
