import { makeGetProfileOrganizationUseCase } from '@/infra/factories/make-get-profile-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ProfileOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user.sub

  try {
    const getProfileOrganizationUseCase = makeGetProfileOrganizationUseCase()

    const organization = await getProfileOrganizationUseCase.execute({
      organizationId: user,
    })

    reply.status(200).send({
      organization: { ...organization, password: undefined },
    })
  } catch (err) {
    reply.status(500).send()
  }
}
