import { FastifyInstance } from 'fastify'
import { register } from './controllers/register/register'
import { authenticate } from './controllers/authenticate/authenticate'
import { profile } from './controllers/profile'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/session', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: verifyJwt }, profile)
}
