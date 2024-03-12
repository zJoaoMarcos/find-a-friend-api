import { makeFetchAllPetsUseCase } from '@/infra/factories/make-fetch-all-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
  })

  const fetchPetsParamsSchema = z.object({
    name: z.string().optional(),
    age: z.string().optional(),
    size: z.string().optional(),
    levelOfIndependence: z.coerce.number().optional(),
    environment: z.string().optional(),
    orderBy: z
      .object({
        levelOfIndependence: z.enum(['asc', 'desc']).optional(),
        age: z.enum(['asc', 'desc']).optional(),
      })
      .optional(),
  })

  const { city, state } = fetchPetsQuerySchema.parse(request.query)
  const params = fetchPetsParamsSchema.parse(request.params)

  try {
    const fetchAllPetsUseCase = makeFetchAllPetsUseCase()

    const { pets, totalCount } = await fetchAllPetsUseCase.execute({
      city,
      state,
      ...params,
    })

    reply.status(200).send({ pets, totalCount })
  } catch (err) {
    console.log(err)
    reply.status(500).send()
  }
}
