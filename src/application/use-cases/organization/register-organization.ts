import { IOrganizationRepository } from '@/application/repositories/organization.repository'

interface RegisterOrganizationUseCaseRequest {
  responsibleName: string
  email: string
  password: string
  name: string
  description: string
  cellNumber: string
  address: string
  addressNumber: string
  city: string
  state: string
  zipCode: string
  addressComplement: string
}

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) {}

  async execute({
    responsibleName,
    email,
    password,
    name,
    description,
    cellNumber,
    address,
    addressNumber,
    addressComplement,
    city,
    state,
    zipCode,
  }: RegisterOrganizationUseCaseRequest) {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new Error()
    }
  }
}
