import { Pet, Prisma } from '@prisma/client'

export interface IPetFindManyQuery {
  city?: string
  name?: string
  age?: string
  size?: string
  levelOfIndependence?: number
  environment?: string
  orderBy?: 'asc' | 'desc'
}

export interface IPetRepository {
  create(pet: Prisma.PetUncheckedCreateInput): Promise<void>
  save(pet: Prisma.PetUpdateInput): Promise<void>
  findMany(params: IPetFindManyQuery): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
}
