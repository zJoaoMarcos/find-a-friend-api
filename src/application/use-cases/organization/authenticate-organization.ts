import { IOrganizationRepository } from '@/application/repositories/organization.repository'
import { CredentialsSentInvalid } from './errors/credentials-sent-invalid.errors'

import * as bcrypt from 'bcrypt'

interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) {}

  async execute({ email, password }: AuthenticateOrganizationUseCaseRequest) {
    const organization = await this.organizationRepository.findByEmail(email)

    if (organization) {
      const isPasswordValid = await bcrypt.compare(
        password,
        organization.password,
      )

      if (isPasswordValid) return { ...organization, password: undefined }
    }

    throw new CredentialsSentInvalid()
  }
}
