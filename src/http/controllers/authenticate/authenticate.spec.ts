import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/user').send({
      name: 'any_name',
      email: 'any@any.com',
      password: 'any_password',
    })

    const response = await request(app.server).post('/session').send({
      email: 'any@any.com',
      password: 'any_password',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
