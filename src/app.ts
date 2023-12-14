import fastify from 'fastify'
import { routes } from './infra/http/controllers/routes'

export const app = fastify()

app.register(routes)
