import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/user').send({
      name: 'any_name',
      email: 'any@any.com',
      password: 'any_password',
    })

    expect(response.status).toEqual(201)
  })
})
