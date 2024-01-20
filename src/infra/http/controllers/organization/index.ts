import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register-organization'
import { authenticateOrganization } from './authenticate-organization'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/', registerOrganization)
  app.post('/auth', authenticateOrganization)
}
