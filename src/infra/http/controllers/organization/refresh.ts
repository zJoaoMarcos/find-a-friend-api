import { FastifyReply, FastifyRequest } from 'fastify'
import { cookieValues } from '../../constants/cookie-values'

export async function refreshOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true })
    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '1s',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
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
      .send({ accessToken })
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
