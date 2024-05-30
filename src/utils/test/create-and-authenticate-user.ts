import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'any_name',
      email: 'any_authenticate_user@any.com',
      password_hash: await hash('any_password', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'any_authenticate_user@any.com',
    password: 'any_password',
  })

  const { token } = authResponse.body

  return { token }
}
