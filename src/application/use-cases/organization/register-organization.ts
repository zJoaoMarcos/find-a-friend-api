import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists.error'

import * as bcrypt from 'bcrypt'

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
    const organizationExists =
      await this.organizationRepository.findByEmail(email)

    if (organizationExists) throw new OrganizationAlreadyExistsError()

    const passwordHashed = await bcrypt.hash(password, 10)

    const organization = {
      responsible_name: responsibleName,
      name,
      email,
      password: passwordHashed,
      description,
      cell_number: cellNumber,
      address,
      address_number: addressNumber,
      address_complement: addressComplement,
      city,
      state,
      zip_code: zipCode,
    }

    await this.organizationRepository.create(organization)
  }
}
