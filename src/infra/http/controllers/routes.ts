import { FastifyInstance } from 'fastify'
import { organizationRoutes } from './organization'
import { petRoutes } from './pet'

export async function routes(app: FastifyInstance) {
  app.register(organizationRoutes, { prefix: 'orgs' })
  app.register(petRoutes, { prefix: 'pets' })
}
