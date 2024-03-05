import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  create(organization: Prisma.OrganizationCreateInput): Promise<void>
  save(organization: Prisma.OrganizationUpdateInput): Promise<void>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  findLocations(): Promise<Array<{ city: string; state: string }> | null>
}
