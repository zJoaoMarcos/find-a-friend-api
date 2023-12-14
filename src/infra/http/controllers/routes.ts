import { FastifyInstance } from 'fastify'
import { organizationRoutes } from './organization'

export async function routes(app: FastifyInstance) {
  app.register(organizationRoutes, { prefix: 'org' })
}
