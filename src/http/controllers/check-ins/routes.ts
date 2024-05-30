import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'
import { create } from './create/create'
import { validate } from './validate/validate'
import { history } from './history/history'
import { metrics } from './metrics/metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
