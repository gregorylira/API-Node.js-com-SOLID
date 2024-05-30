import { FastifyInstance } from 'fastify'
import { register } from './register/register'
import { authenticate } from './authenticate/authenticate'
import { profile } from './profile/profile'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { refresh } from './refresh/refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
