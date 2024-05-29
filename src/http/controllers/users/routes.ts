import { FastifyInstance } from 'fastify'
import { register } from './register/register'
import { authenticate } from './authenticate/authenticate'
import { profile } from './profile/profile'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/session', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: verifyJwt }, profile)
}
