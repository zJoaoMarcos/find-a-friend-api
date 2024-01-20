import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register-organization'
import { authenticateOrganization } from './authenticate-organization'
import { ProfileOrganization } from './profile-organization'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/', registerOrganization)
  app.post('/auth', authenticateOrganization)
  app.get('/me', { onRequest: [verifyJwt] }, ProfileOrganization)
}
