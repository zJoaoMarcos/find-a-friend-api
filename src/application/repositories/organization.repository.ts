import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  create(organization: Prisma.OrganizationCreateInput): Promise<Organization>
  save(organization: Prisma.OrganizationUpdateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
}
