import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register-organization'
import { authenticateOrganization } from './authenticate-organization'
import { ProfileOrganization } from './profile-organization'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { getOrganizationsLocation } from './get-organizations-location'
import { refreshOrganization } from './refresh'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, registerOrganization)
  app.get('/me', { onRequest: [verifyJwt] }, ProfileOrganization)
  app.get('/locations', getOrganizationsLocation)

  /** Auth */
  app.post('/auth', authenticateOrganization)
  app.patch('/auth/refresh', refreshOrganization)
}
