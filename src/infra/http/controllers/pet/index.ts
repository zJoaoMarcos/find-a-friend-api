import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { fetchPets } from './fetch-pets'

export async function petRoutes(app: FastifyInstance) {
  app.post('/', registerPet)
  app.get('/:city', fetchPets)
}
