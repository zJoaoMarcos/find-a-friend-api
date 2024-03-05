import { LocationNotFoundError } from '@/application/use-cases/organization/errors/location-not-found-error'
import { makeGetLocationsOfOrganizationsUseCase } from '@/infra/factories/make-get-locations-of-organizations-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getOrganizationsLocation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getOrganizationsLocationUseCase =
      makeGetLocationsOfOrganizationsUseCase()

    const organizationsLocation =
      await getOrganizationsLocationUseCase.execute()

    reply.status(200).send({ organizationsLocation })
  } catch (err) {
    if (err instanceof LocationNotFoundError) {
      reply.status(409).send({ message: err.message })
    }

    reply.status(500).send()
  }
}
