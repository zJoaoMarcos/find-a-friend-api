import { makeGetPetByIdUseCase } from '@/infra/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const getPetByIdQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = getPetByIdQuerySchema.parse(request.body)

  try {
    const getByIdUseCase = makeGetPetByIdUseCase()

    const pet = await getByIdUseCase.execute({ petId: id })

    reply.status(200).send({ pet })
  } catch (err) {
    reply.status(500).send()
  }
}
