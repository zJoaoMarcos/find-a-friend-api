import { InMemoryPetRepository } from '@/test/repositories/in-memory-pet-repository'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryOrganizationRepository } from '@/test/repositories/in-memory-organization'
import { beforeEach, describe, it, expect } from 'vitest'
import { OrganizationNotFoundError } from '../organization/errors/organization-not-found.error'
import { Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterPetUseCase(petRepository, organizationRepository)
  })

  it('should be able to register an pet', async () => {
    const organization: Organization = {
      id: randomUUID(),
      responsible_name: 'Jhon Doe',
      email: 'jhon.doe@email.com',
      password: 'fake-password',
      name: 'fake-name',
      description: 'fake-description',
      cell_number: 'fake-cell-number',
      address: 'fake-address',
      address_number: 'fake-address-number',
      address_complement: 'fake-complement',
      city: 'fake-city',
      state: 'fake-state',
      zip_code: 'fake-zip_code',
    }
    organizationRepository.items.push(organization)

    const { pet } = await sut.execute({
      name: 'Jhon',
      about: 'very happy and ',
      age: '2 months',
      levelOfIndependence: 1,
      organizationId: organization.id,
      photos: [],
      size: 'small',
      requirementsForAdoption: ['space', 'energy'],
      environment: '',
    })

    expect(pet.name).toEqual('Jhon')
  })

  it('should not be able to register an pet without organization registered', async () => {
    await expect(() =>
      sut.execute({
        name: 'Jhon',
        about: 'very happy and ',
        age: '2 months',
        levelOfIndependence: 1,
        organizationId: 'fake-org-id',
        photos: [],
        size: 'small',
        requirementsForAdoption: ['space', 'energy'],
        environment: '',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
