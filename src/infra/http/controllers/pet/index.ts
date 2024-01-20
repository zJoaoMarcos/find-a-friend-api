import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { fetchPets } from './fetch-pets'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, registerPet)
  app.get('/:city', fetchPets)
}
