import { InvalidCredentialsError } from '@/application/use-cases/organization/errors/invalid-credentials-error'
import { makeAuthenticateOrganizationUseCase } from '@/infra/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { cookieValues } from '../../constants/cookie-values'

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

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: '1s',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: '7d',
        },
      },
    )

    reply
      .status(200)
      .setCookie(cookieValues.refreshToken, refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ accessToken, organization })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: err.message })
    }

    reply.status(500).send(err)
  }
}
