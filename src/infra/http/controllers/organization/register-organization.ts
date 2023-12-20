import { makeRegisterOrganizationUseCase } from '@/infra/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationBodySchema = z.object({
    name: z.string(),
    responsibleName: z.string(),
    email: z.string(),
    password: z.string(),
    description: z.string(),
    cellNumber: z.string(),
    address: z.string(),
    addressNumber: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    addressComplement: z.string(),
  })

  const {
    name,
    responsibleName,
    email,
    password,
    description,
    cellNumber,
    address,
    addressNumber,
    city,
    state,
    zipCode,
    addressComplement,
  } = registerOrganizationBodySchema.parse(request.body)

  try {
    const registerOganizationUseCase = makeRegisterOrganizationUseCase()

    await registerOganizationUseCase.execute({
      name,
      responsibleName,
      email,
      password,
      description,
      cellNumber,
      address,
      addressNumber,
      city,
      state,
      zipCode,
      addressComplement,
    })

    reply.status(201).send()
  } catch (err) {
    console.log(err)
    reply.status(500).send()
  }
}
