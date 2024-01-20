import { makeAuthenticateOrganizationUseCase } from '@/infra/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body,
  )

  try {
    const authenticateOrganizationUseCase =
      makeAuthenticateOrganizationUseCase()

    const organization = await authenticateOrganizationUseCase.execute({
      email,
      password,
    })

    reply.status(200).send(organization)
  } catch (err) {
    console.log(err)
    reply.status(500).send(err)
  }
}
