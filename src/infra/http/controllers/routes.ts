import { FastifyInstance } from 'fastify'
import { organizationRoutes } from './organization'
import { petRoutes } from './pet'

export async function routes(app: FastifyInstance) {
  app.register(organizationRoutes, { prefix: 'org' })
  app.register(petRoutes, { prefix: 'pet' })
}
