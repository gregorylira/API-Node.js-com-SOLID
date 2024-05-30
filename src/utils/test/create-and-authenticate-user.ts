import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/user').send({
    name: 'any_name',
    email: 'any@any.com',
    password: 'any_password',
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'any@any.com',
    password: 'any_password',
  })

  const { token } = authResponse.body

  return { token }
}
