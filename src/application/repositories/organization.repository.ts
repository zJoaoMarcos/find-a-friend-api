import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  create(organization: Prisma.OrganizationCreateInput): Promise<void>
  save(organization: Prisma.OrganizationUpdateInput): Promise<void>
  findByEmail(email: string): Promise<Organization | null>
}
