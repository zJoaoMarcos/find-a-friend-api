import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { PrismaService } from '../../prisma/prisma'
import { Organization, Prisma } from '@prisma/client'

export class PrismaOrganizationRepository implements IOrganizationRepository {
  constructor(private prismaService: typeof PrismaService) {}

  async create(organization: Prisma.OrganizationCreateInput) {
    await this.prismaService.organization.create({
      data: {
        ...organization,
      },
    })
  }

  async save(organization: Prisma.OrganizationUpdateInput) {
    await this.prismaService.organization.update({
      where: {
        id: organization.id as string,
      },
      data: {
        ...organization,
      },
    })
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await this.prismaService.organization.findUnique({
      where: {
        email,
      },
    })

    if (!organization) return null

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await this.prismaService.organization.findUnique({
      where: {
        id,
      },
    })

    if (!organization) return null

    return organization
  }
}
