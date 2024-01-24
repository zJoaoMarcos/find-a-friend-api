import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { Organization, Prisma } from '@prisma/client'

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  public items: Organization[] = []

  async create(organization: Prisma.OrganizationCreateInput): Promise<void> {
    this.items.push(organization as Organization)
  }

  async save(organization: Prisma.OrganizationUpdateInput): Promise<void> {
    const index = this.items.findIndex((item) => item.id === organization.id)

    this.items[index] = organization as Organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) return null

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) return null

    return organization
  }
}
