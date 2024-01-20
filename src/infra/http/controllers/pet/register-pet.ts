import { makeRegisterPetUseCase } from '@/infra/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    levelOfIndependence: z.coerce.number(),
    photos: z.array(z.string()),
    environment: z.string(),
    requirementsForAdoption: z.array(z.string()),
    organizationId: z.string(),
  })

  const {
    name,
    about,
    age,
    size,
    levelOfIndependence,
    photos,
    environment,
    requirementsForAdoption,
    organizationId,
  } = registerPetBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      name,
      about,
      age,
      size,
      levelOfIndependence,
      photos,
      environment,
      requirementsForAdoption,
      organizationId,
    })

    reply.status(201).send()
  } catch (err) {
    console.log(err)
    reply.status(500).send()
  }
}
