import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register-organization'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/', registerOrganization)
}
